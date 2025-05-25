import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <main className="pt-20 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}
