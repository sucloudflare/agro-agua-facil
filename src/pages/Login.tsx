import { useState } from "react";
import { Droplets, Eye, EyeOff, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary px-4">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-primary-foreground/20 rounded-full p-4 mb-4">
          <Droplets className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-primary-foreground">AgroSmart</h1>
        <p className="text-primary-foreground/70 text-sm mt-1">Irrigação Inteligente</p>
      </div>

      <Card className="w-full max-w-sm shadow-xl">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 text-center">
            {isLogin ? "Entrar" : "Criar Conta"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                placeholder="Nome da propriedade"
                className="h-12 text-base"
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              className="h-12 text-base"
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                className="h-12 text-base pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold">
              {isLogin ? "Entrar" : "Cadastrar"}
            </Button>
          </form>

          <div className="mt-4 flex flex-col gap-2">
            <Button variant="outline" size="lg" className="w-full h-12 text-base gap-2">
              <Mail className="h-5 w-5" />
              Entrar com Google
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-semibold underline"
            >
              {isLogin ? "Cadastre-se" : "Faça login"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
