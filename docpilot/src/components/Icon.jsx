import {
  Car, ScanLine, FileStack, ShieldCheck, Calculator, BadgeCheck, Banknote,
  RefreshCw, Gauge, Sparkles, TrendingDown, Clock, Lock, MapPin, CheckCircle2,
  Minimize2, UserCheck, ScrollText, Target, Crosshair, Tag, HeartHandshake,
  LayoutDashboard, Microscope, MessageSquareText, TriangleAlert, Wand2,
  PlayCircle, BarChart3, Check, X, Loader2, Eye, Brain, ArrowRight, FileText,
  Image as ImageIcon, Send, CheckCheck, Bot, User, Phone, Zap, ChevronRight,
  RotateCcw, Play, Pause, FileCheck2, AlertCircle, Stamp, Workflow,
} from 'lucide-react'

const REGISTRY = {
  Car, ScanLine, FileStack, ShieldCheck, Calculator, BadgeCheck, Banknote,
  RefreshCw, Gauge, Sparkles, TrendingDown, Clock, Lock, MapPin, CheckCircle2,
  Minimize2, UserCheck, ScrollText, Target, Crosshair, Tag, HeartHandshake,
  LayoutDashboard, Microscope, MessageSquareText, TriangleAlert, Wand2,
  PlayCircle, BarChart3, Check, X, Loader2, Eye, Brain, ArrowRight, FileText,
  ImageIcon, Send, CheckCheck, Bot, User, Phone, Zap, ChevronRight,
  RotateCcw, Play, Pause, FileCheck2, AlertCircle, Stamp, Workflow,
}

export default function Icon({ name, ...props }) {
  const Cmp = REGISTRY[name] || FileText
  return <Cmp {...props} />
}
