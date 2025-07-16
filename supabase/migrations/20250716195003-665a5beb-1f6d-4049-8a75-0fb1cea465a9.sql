
-- Create audits table
CREATE TABLE public.audits (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    project_name TEXT NOT NULL,
    repository TEXT NOT NULL,
    branch TEXT NOT NULL DEFAULT 'main',
    audit_type TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE,
    duration TEXT,
    issues INTEGER NOT NULL DEFAULT 0,
    severity TEXT NOT NULL DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high')),
    score INTEGER,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create audit_results table
CREATE TABLE public.audit_results (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    audit_id UUID REFERENCES public.audits(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('security', 'performance', 'quality', 'bug')),
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    message TEXT NOT NULL,
    file TEXT NOT NULL,
    line INTEGER,
    column_number INTEGER,
    rule TEXT,
    suggestion TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_results ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for audits
CREATE POLICY "Users can view their own audits" 
    ON public.audits 
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own audits" 
    ON public.audits 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own audits" 
    ON public.audits 
    FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own audits" 
    ON public.audits 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Create RLS policies for audit_results
CREATE POLICY "Users can view audit results for their audits" 
    ON public.audit_results 
    FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM public.audits 
        WHERE audits.id = audit_results.audit_id 
        AND audits.user_id = auth.uid()
    ));

CREATE POLICY "Users can create audit results for their audits" 
    ON public.audit_results 
    FOR INSERT 
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.audits 
        WHERE audits.id = audit_results.audit_id 
        AND audits.user_id = auth.uid()
    ));

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_audits_updated_at 
    BEFORE UPDATE ON public.audits 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_audits_user_id ON public.audits(user_id);
CREATE INDEX idx_audits_status ON public.audits(status);
CREATE INDEX idx_audits_created_at ON public.audits(created_at DESC);
CREATE INDEX idx_audit_results_audit_id ON public.audit_results(audit_id);
CREATE INDEX idx_audit_results_severity ON public.audit_results(severity);
