
import { create } from 'zustand'

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
  createAudit: (auditData: Omit<Audit, 'id' | 'status' | 'createdAt' | 'issues' | 'severity'>) => Promise<string>
  runAudit: (auditId: string) => Promise<void>
  getAuditById: (id: string) => Audit | undefined
  deleteAudit: (id: string) => void
  clearError: () => void
}

// Simulation d'analyse de code
const simulateCodeAnalysis = async (audit: Omit<Audit, 'id' | 'status' | 'createdAt' | 'issues' | 'severity'>): Promise<AuditResult[]> => {
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
  audits: [
    {
      id: '1',
      projectName: 'E-commerce Frontend',
      repository: 'https://github.com/example/ecommerce',
      branch: 'main',
      auditType: 'complete',
      description: 'Audit complet du frontend e-commerce',
      status: 'completed',
      createdAt: '2024-01-15T10:00:00Z',
      completedAt: '2024-01-15T10:15:00Z',
      duration: '15 min',
      issues: 12,
      severity: 'high',
      score: 85,
      results: []
    },
    {
      id: '2',
      projectName: 'API Backend',
      repository: 'https://github.com/example/api',
      branch: 'develop',
      auditType: 'security',
      description: 'Audit de sécurité de l\'API',
      status: 'running',
      createdAt: '2024-01-14T14:30:00Z',
      duration: '8 min',
      issues: 8,
      severity: 'medium',
      results: []
    },
    {
      id: '3',
      projectName: 'Mobile App',
      repository: 'https://github.com/example/mobile',
      branch: 'main',
      auditType: 'quality',
      description: 'Audit qualité du code mobile',
      status: 'completed',
      createdAt: '2024-01-12T16:20:00Z',
      completedAt: '2024-01-12T16:32:00Z',
      duration: '12 min',
      issues: 3,
      severity: 'low',
      score: 92,
      results: []
    }
  ],
  isLoading: false,
  error: null,
  currentAudit: null,

  createAudit: async (auditData) => {
    set({ isLoading: true, error: null })
    
    try {
      const newAudit: Audit = {
        ...auditData,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        issues: 0,
        severity: 'low'
      }
      
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
    
    // Mettre l'audit en cours d'exécution
    set(state => ({
      audits: state.audits.map(a => 
        a.id === auditId 
          ? { ...a, status: 'running' as const }
          : a
      )
    }))
    
    try {
      const startTime = Date.now()
      const results = await simulateCodeAnalysis(audit)
      const endTime = Date.now()
      const duration = Math.round((endTime - startTime) / 1000)
      
      const severity = calculateSeverity(results)
      const score = calculateScore(results)
      
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

  deleteAudit: (id) => {
    set(state => ({
      audits: state.audits.filter(audit => audit.id !== id)
    }))
  },

  clearError: () => {
    set({ error: null })
  }
}))
