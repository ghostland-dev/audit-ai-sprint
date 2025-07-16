
import { create } from 'zustand'
import { supabase } from '@/integrations/supabase/client'

export interface Audit {
  id: string
  projectName: string
  repository: string
  branch: string
  auditType: string
  description?: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  createdAt: string
  completedAt?: string
  duration?: string
  issues: number
  severity: 'low' | 'medium' | 'high'
  score?: number
  results?: AuditResult[]
}

export interface AuditResult {
  id: string
  type: 'security' | 'performance' | 'quality' | 'bug'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  file: string
  line?: number
  column?: number
  rule?: string
  suggestion?: string
}

interface AuditStore {
  audits: Audit[]
  isLoading: boolean
  error: string | null
  currentAudit: Audit | null
  
  // Actions
  fetchAudits: () => Promise<void>
  createAudit: (auditData: Omit<Audit, 'id' | 'status' | 'createdAt' | 'issues' | 'severity'>) => Promise<string>
  runAudit: (auditId: string) => Promise<void>
  getAuditById: (id: string) => Audit | undefined
  deleteAudit: (id: string) => Promise<void>
  clearError: () => void
}

// Transform database audit to store audit
const transformDbAudit = (dbAudit: any): Audit => ({
  id: dbAudit.id,
  projectName: dbAudit.project_name,
  repository: dbAudit.repository,
  branch: dbAudit.branch,
  auditType: dbAudit.audit_type,
  description: dbAudit.description,
  status: dbAudit.status,
  createdAt: dbAudit.created_at,
  completedAt: dbAudit.completed_at,
  duration: dbAudit.duration,
  issues: dbAudit.issues,
  severity: dbAudit.severity,
  score: dbAudit.score,
  results: []
})

// Transform store audit to database audit
const transformStoreAudit = (audit: Omit<Audit, 'id' | 'status' | 'createdAt' | 'issues' | 'severity'>) => ({
  project_name: audit.projectName,
  repository: audit.repository,
  branch: audit.branch,
  audit_type: audit.auditType,
  description: audit.description,
})

// Simulation d'analyse de code
const simulateCodeAnalysis = async (): Promise<AuditResult[]> => {
  // Simuler un délai d'analyse
  await new Promise(resolve => setTimeout(resolve, Math.random() * 5000 + 2000))
  
  const mockResults: AuditResult[] = []
  const fileTypes = ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.php']
  const severities: AuditResult['severity'][] = ['low', 'medium', 'high', 'critical']
  const types: AuditResult['type'][] = ['security', 'performance', 'quality', 'bug']
  
  const numIssues = Math.floor(Math.random() * 20) + 1
  
  for (let i = 0; i < numIssues; i++) {
    mockResults.push({
      id: `issue-${i}`,
      type: types[Math.floor(Math.random() * types.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      message: `Issue détectée dans le code: ${['Vulnérabilité XSS détectée', 'Performance dégradée', 'Code dupliqué', 'Variable non utilisée', 'Fonction trop complexe'][Math.floor(Math.random() * 5)]}`,
      file: `src/components/Component${i}${fileTypes[Math.floor(Math.random() * fileTypes.length)]}`,
      line: Math.floor(Math.random() * 100) + 1,
      column: Math.floor(Math.random() * 50) + 1,
      rule: `rule-${Math.floor(Math.random() * 100)}`,
      suggestion: 'Corriger ce problème en appliquant les bonnes pratiques de sécurité'
    })
  }
  
  return mockResults
}

const calculateSeverity = (results: AuditResult[]): 'low' | 'medium' | 'high' => {
  const criticalCount = results.filter(r => r.severity === 'critical').length
  const highCount = results.filter(r => r.severity === 'high').length
  
  if (criticalCount > 0 || highCount > 3) return 'high'
  if (highCount > 0 || results.filter(r => r.severity === 'medium').length > 5) return 'medium'
  return 'low'
}

const calculateScore = (results: AuditResult[]): number => {
  let score = 100
  results.forEach(result => {
    switch (result.severity) {
      case 'critical': score -= 10; break
      case 'high': score -= 5; break
      case 'medium': score -= 2; break
      case 'low': score -= 1; break
    }
  })
  return Math.max(score, 0)
}

export const useAuditStore = create<AuditStore>((set, get) => ({
  audits: [],
  isLoading: false,
  error: null,
  currentAudit: null,

  fetchAudits: async () => {
    set({ isLoading: true, error: null })
    
    try {
      const { data: auditsData, error } = await supabase
        .from('audits')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const audits = auditsData?.map(transformDbAudit) || []
      set({ audits, isLoading: false })
    } catch (error) {
      console.error('Error fetching audits:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement des audits',
        isLoading: false 
      })
    }
  },

  createAudit: async (auditData) => {
    set({ isLoading: true, error: null })
    
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) {
        throw new Error('Vous devez être connecté pour créer un audit')
      }

      const dbAudit = {
        ...transformStoreAudit(auditData),
        user_id: user.user.id
      }

      const { data, error } = await supabase
        .from('audits')
        .insert([dbAudit])
        .select()
        .single()

      if (error) throw error

      const newAudit = transformDbAudit(data)
      
      set(state => ({
        audits: [newAudit, ...state.audits],
        isLoading: false
      }))
      
      // Lancer automatiquement l'audit
      setTimeout(() => {
        get().runAudit(newAudit.id)
      }, 1000)
      
      return newAudit.id
    } catch (error) {
      console.error('Error creating audit:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors de la création de l\'audit',
        isLoading: false 
      })
      throw error
    }
  },

  runAudit: async (auditId) => {
    const audit = get().audits.find(a => a.id === auditId)
    if (!audit) return
    
    try {
      // Mettre l'audit en cours d'exécution
      const { error: updateError } = await supabase
        .from('audits')
        .update({ status: 'running' })
        .eq('id', auditId)

      if (updateError) throw updateError

      set(state => ({
        audits: state.audits.map(a => 
          a.id === auditId 
            ? { ...a, status: 'running' as const }
            : a
        )
      }))
      
      const startTime = Date.now()
      const results = await simulateCodeAnalysis()
      const endTime = Date.now()
      const duration = Math.round((endTime - startTime) / 1000)
      
      const severity = calculateSeverity(results)
      const score = calculateScore(results)
      
      // Mettre à jour l'audit avec les résultats
      const { error: finalUpdateError } = await supabase
        .from('audits')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          duration: `${Math.floor(duration / 60)}m ${duration % 60}s`,
          issues: results.length,
          severity,
          score
        })
        .eq('id', auditId)

      if (finalUpdateError) throw finalUpdateError

      // Insérer les résultats d'audit
      if (results.length > 0) {
        const auditResults = results.map(result => ({
          audit_id: auditId,
          type: result.type,
          severity: result.severity,
          message: result.message,
          file: result.file,
          line: result.line,
          column_number: result.column,
          rule: result.rule,
          suggestion: result.suggestion
        }))

        const { error: resultsError } = await supabase
          .from('audit_results')
          .insert(auditResults)

        if (resultsError) throw resultsError
      }

      set(state => ({
        audits: state.audits.map(a => 
          a.id === auditId 
            ? { 
                ...a, 
                status: 'completed' as const,
                completedAt: new Date().toISOString(),
                duration: `${Math.floor(duration / 60)}m ${duration % 60}s`,
                issues: results.length,
                severity,
                score,
                results
              }
            : a
        )
      }))
    } catch (error) {
      console.error('Error running audit:', error)
      
      // Marquer l'audit comme échoué
      await supabase
        .from('audits')
        .update({ status: 'failed' })
        .eq('id', auditId)

      set(state => ({
        audits: state.audits.map(a => 
          a.id === auditId 
            ? { ...a, status: 'failed' as const }
            : a
        ),
        error: 'Erreur lors de l\'exécution de l\'audit'
      }))
    }
  },

  getAuditById: (id) => {
    return get().audits.find(audit => audit.id === id)
  },

  deleteAudit: async (id) => {
    try {
      const { error } = await supabase
        .from('audits')
        .delete()
        .eq('id', id)

      if (error) throw error

      set(state => ({
        audits: state.audits.filter(audit => audit.id !== id)
      }))
    } catch (error) {
      console.error('Error deleting audit:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors de la suppression de l\'audit'
      })
    }
  },

  clearError: () => {
    set({ error: null })
  }
}))
