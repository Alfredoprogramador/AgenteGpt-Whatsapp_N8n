-- ====================================
-- Agente GPT WhatsApp N8n
-- Database Initialization Script
-- ====================================

-- Criar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================
-- Tabela de usuários
-- ====================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    first_interaction TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_interaction TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message_count INTEGER DEFAULT 0,
    is_blocked BOOLEAN DEFAULT FALSE,
    preferences JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- Tabela de conversas
-- ====================================
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    message_id VARCHAR(255) UNIQUE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    tokens_used INTEGER DEFAULT 0,
    cost DECIMAL(10, 6) DEFAULT 0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- Tabela de métricas
-- ====================================
CREATE TABLE IF NOT EXISTS metrics (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    total_messages INTEGER DEFAULT 0,
    total_users INTEGER DEFAULT 0,
    total_tokens INTEGER DEFAULT 0,
    total_cost DECIMAL(10, 2) DEFAULT 0,
    avg_response_time FLOAT,
    successful_responses INTEGER DEFAULT 0,
    failed_responses INTEGER DEFAULT 0,
    errors INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date)
);

-- ====================================
-- Tabela de configurações
-- ====================================
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    category VARCHAR(100) DEFAULT 'general',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- Tabela de logs
-- ====================================
CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    level VARCHAR(20) NOT NULL CHECK (level IN ('error', 'warn', 'info', 'debug')),
    message TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- Tabela de templates
-- ====================================
CREATE TABLE IF NOT EXISTS message_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    template_type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    variables JSONB DEFAULT '[]',
    language VARCHAR(10) DEFAULT 'pt_BR',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- Índices para performance
-- ====================================

-- Índices para users
CREATE INDEX IF NOT EXISTS idx_users_phone_number ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_users_last_interaction ON users(last_interaction DESC);

-- Índices para conversations
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_phone_number ON conversations(phone_number);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_role ON conversations(role);

-- Índices para metrics
CREATE INDEX IF NOT EXISTS idx_metrics_date ON metrics(date DESC);

-- Índices para logs
CREATE INDEX IF NOT EXISTS idx_logs_level ON logs(level);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at DESC);

-- ====================================
-- Funções auxiliares
-- ====================================

-- Função para atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Função para incrementar contador de mensagens
CREATE OR REPLACE FUNCTION increment_user_message_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users 
    SET message_count = message_count + 1,
        last_interaction = CURRENT_TIMESTAMP
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ====================================
-- Triggers
-- ====================================

-- Trigger para atualizar updated_at em users
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para atualizar updated_at em settings
DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;
CREATE TRIGGER update_settings_updated_at 
    BEFORE UPDATE ON settings
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para atualizar updated_at em message_templates
DROP TRIGGER IF EXISTS update_templates_updated_at ON message_templates;
CREATE TRIGGER update_templates_updated_at 
    BEFORE UPDATE ON message_templates
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para incrementar message_count
DROP TRIGGER IF EXISTS increment_message_count ON conversations;
CREATE TRIGGER increment_message_count
    AFTER INSERT ON conversations
    FOR EACH ROW
    WHEN (NEW.role = 'user')
    EXECUTE FUNCTION increment_user_message_count();

-- ====================================
-- Dados iniciais (configurações)
-- ====================================
INSERT INTO settings (key, value, description, category) VALUES
    ('system_prompt', 'Você é um assistente virtual atencioso e prestativo que atende clientes via WhatsApp. Seja cordial, objetivo e use linguagem natural em Português BR.', 'Prompt do sistema para o GPT', 'ai'),
    ('max_context_messages', '10', 'Número máximo de mensagens de contexto', 'ai'),
    ('gpt_model', 'gpt-3.5-turbo', 'Modelo GPT padrão', 'ai'),
    ('gpt_temperature', '0.7', 'Temperature do GPT', 'ai'),
    ('gpt_max_tokens', '500', 'Máximo de tokens por resposta', 'ai'),
    ('auto_response_enabled', 'true', 'Ativar respostas automáticas', 'general'),
    ('business_hours_start', '08:00', 'Horário de início do atendimento', 'general'),
    ('business_hours_end', '18:00', 'Horário de fim do atendimento', 'general'),
    ('fallback_to_human', 'true', 'Permitir transferência para humano', 'general'),
    ('rate_limit_messages_per_minute', '10', 'Limite de mensagens por minuto por usuário', 'security'),
    ('welcome_message', 'Olá! 👋 Como posso ajudar você hoje?', 'Mensagem de boas-vindas', 'messages'),
    ('offline_message', 'Obrigado pela mensagem! Estamos fora do horário de atendimento. Retornaremos em breve.', 'Mensagem fora do horário', 'messages')
ON CONFLICT (key) DO NOTHING;

-- ====================================
-- Templates de mensagem iniciais
-- ====================================
INSERT INTO message_templates (name, template_type, content, variables, language) VALUES
    ('welcome', 'text', 'Olá {{name}}! 👋 Bem-vindo(a)! Como posso ajudar você hoje?', '["name"]', 'pt_BR'),
    ('goodbye', 'text', 'Foi um prazer ajudar você! 😊 Até breve!', '[]', 'pt_BR'),
    ('transfer_to_human', 'text', 'Entendi. Vou transferir você para um de nossos atendentes. Por favor, aguarde um momento.', '[]', 'pt_BR'),
    ('error', 'text', 'Desculpe, tive um problema ao processar sua mensagem. Por favor, tente novamente.', '[]', 'pt_BR'),
    ('rate_limit', 'text', 'Por favor, aguarde alguns instantes antes de enviar outra mensagem. 🙏', '[]', 'pt_BR')
ON CONFLICT (name) DO NOTHING;

-- ====================================
-- Views úteis
-- ====================================

-- View de estatísticas por usuário
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
    u.id,
    u.phone_number,
    u.name,
    u.message_count,
    u.first_interaction,
    u.last_interaction,
    COUNT(c.id) as total_conversations,
    SUM(CASE WHEN c.role = 'user' THEN 1 ELSE 0 END) as user_messages,
    SUM(CASE WHEN c.role = 'assistant' THEN 1 ELSE 0 END) as assistant_messages,
    SUM(c.tokens_used) as total_tokens_used,
    SUM(c.cost) as total_cost
FROM users u
LEFT JOIN conversations c ON u.id = c.user_id
GROUP BY u.id, u.phone_number, u.name, u.message_count, u.first_interaction, u.last_interaction;

-- View de métricas diárias
CREATE OR REPLACE VIEW daily_metrics AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_messages,
    COUNT(DISTINCT phone_number) as unique_users,
    SUM(tokens_used) as total_tokens,
    SUM(cost) as total_cost,
    COUNT(CASE WHEN role = 'user' THEN 1 END) as user_messages,
    COUNT(CASE WHEN role = 'assistant' THEN 1 END) as bot_messages
FROM conversations
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ====================================
-- Comentários nas tabelas
-- ====================================
COMMENT ON TABLE users IS 'Tabela de usuários do WhatsApp';
COMMENT ON TABLE conversations IS 'Histórico de conversas completo';
COMMENT ON TABLE metrics IS 'Métricas agregadas diárias';
COMMENT ON TABLE settings IS 'Configurações do sistema';
COMMENT ON TABLE logs IS 'Logs de sistema e erros';
COMMENT ON TABLE message_templates IS 'Templates de mensagens predefinidos';

-- ====================================
-- Finalização
-- ====================================
-- Conceder permissões específicas (princípio do menor privilégio)
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO n8n;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO n8n;

-- Mensagem de conclusão
DO $$
BEGIN
    RAISE NOTICE 'Database initialization completed successfully!';
    RAISE NOTICE 'Tables created: users, conversations, metrics, settings, logs, message_templates';
    RAISE NOTICE 'Views created: user_statistics, daily_metrics';
END $$;
