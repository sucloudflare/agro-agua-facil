import { Droplets, Thermometer, CloudRain, Clock, ChevronRight, Bell, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { fazendas, sensores, leituras7dias, irrigacoes, getStatusIrrigacao } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const fazenda = fazendas[0];
  const sensoresFazenda = sensores.filter((s) => s.fazendaId === fazenda.id);
  const umidadeMedia = Math.round(sensoresFazenda.reduce((acc, s) => acc + s.umidadeAtual, 0) / sensoresFazenda.length);
  const status = getStatusIrrigacao(umidadeMedia);
  const ultimaIrrigacao = irrigacoes.filter((i) => i.fazendaId === fazenda.id)[0];

  const statusColors = {
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    danger: "bg-danger text-danger-foreground animate-pulse-slow",
  };

  return (
    <div className="space-y-4">
      {/* Fazenda selecionada */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">{fazenda.nome}</h2>
          <p className="text-sm text-muted-foreground">{fazenda.culturaPrincipal} · {fazenda.tamanhoHa} ha</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/fazendas")}>
          Trocar
        </Button>
      </div>

      {/* Status Card */}
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
        <Card className={`${statusColors[status.cor]} border-0 shadow-lg`}>
          <CardContent className="py-6 text-center">
            <Droplets className="h-10 w-10 mx-auto mb-2" />
            <p className="text-2xl font-bold">{status.label}</p>
            <p className="text-lg mt-1">Umidade média: {umidadeMedia}%</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="py-3 px-3 text-center">
            <CloudRain className="h-5 w-5 mx-auto text-info mb-1" />
            <p className="text-xs text-muted-foreground">Previsão</p>
            <p className="text-sm font-bold text-foreground">18 mm</p>
            <p className="text-[10px] text-muted-foreground">Hoje</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 px-3 text-center">
            <Thermometer className="h-5 w-5 mx-auto text-warning mb-1" />
            <p className="text-xs text-muted-foreground">Temp. solo</p>
            <p className="text-sm font-bold text-foreground">23°C</p>
            <p className="text-[10px] text-muted-foreground">Média</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 px-3 text-center">
            <Clock className="h-5 w-5 mx-auto text-primary mb-1" />
            <p className="text-xs text-muted-foreground">Última irrig.</p>
            <p className="text-sm font-bold text-foreground">{ultimaIrrigacao?.quantidadeMm} mm</p>
            <p className="text-[10px] text-muted-foreground">{ultimaIrrigacao?.data?.slice(5)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardContent className="pt-4 pb-2 px-2">
          <h3 className="text-sm font-semibold text-foreground mb-3 px-2">Últimos 7 dias</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={leituras7dias}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="umidade" name="Umidade %" stroke="hsl(145, 63%, 32%)" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="chuva" name="Chuva mm" stroke="hsl(200, 80%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="temperatura" name="Temp °C" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          size="lg"
          className="h-14 text-sm font-semibold gap-2"
          onClick={() => navigate("/monitoramento")}
        >
          <Activity className="h-5 w-5" />
          Ver Detalhes
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-14 text-sm font-semibold gap-2"
          onClick={() => navigate("/configuracoes")}
        >
          <Bell className="h-5 w-5" />
          Alertas
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
