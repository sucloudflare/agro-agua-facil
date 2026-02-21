import { useState } from "react";
import { Battery, Thermometer, Droplets, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sensores, fazendas, leituras7dias, getStatusIrrigacao } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const periodos = ["24h", "7d", "30d"] as const;

const Monitoring = () => {
  const [periodo, setPeriodo] = useState<typeof periodos[number]>("7d");
  const [refreshing, setRefreshing] = useState(false);
  const fazenda = fazendas[0];
  const sensoresFazenda = sensores.filter((s) => s.fazendaId === fazenda.id);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const getStatusColor = (umidade: number) => {
    const status = getStatusIrrigacao(umidade);
    return status.cor === "success"
      ? "bg-success/15 border-success/30"
      : status.cor === "warning"
      ? "bg-warning/15 border-warning/30"
      : "bg-danger/15 border-danger/30";
  };

  const getBarColor = (pct: number) => {
    if (pct > 50) return "bg-success";
    if (pct > 20) return "bg-warning";
    return "bg-danger";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Monitoramento</h2>
          <p className="text-sm text-muted-foreground">{fazenda.nome}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
          className="gap-1"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </div>

      {/* Sensores */}
      <div className="space-y-3">
        {sensoresFazenda.map((sensor, i) => {
          const status = getStatusIrrigacao(sensor.umidadeAtual);
          return (
            <motion.div
              key={sensor.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`border ${getStatusColor(sensor.umidadeAtual)}`}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm">{sensor.nome}</h3>
                    <span className="text-[10px] text-muted-foreground">ID: {sensor.id} · {sensor.profundidadeCm}cm</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-lg font-bold text-foreground">{sensor.umidadeAtual}%</p>
                        <p className="text-[10px] text-muted-foreground">Umidade</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-warning" />
                      <div>
                        <p className="text-lg font-bold text-foreground">{sensor.temperaturaSolo}°C</p>
                        <p className="text-[10px] text-muted-foreground">Temp. solo</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-lg font-bold text-foreground">{sensor.bateriaPct}%</p>
                        <div className="w-12 h-1.5 bg-muted rounded-full mt-0.5">
                          <div className={`h-full rounded-full ${getBarColor(sensor.bateriaPct)}`} style={{ width: `${sensor.bateriaPct}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      status.cor === "success" ? "bg-success/20 text-success" :
                      status.cor === "warning" ? "bg-warning/20 text-warning" :
                      "bg-danger/20 text-danger"
                    }`}>
                      {status.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      Última: {new Date(sensor.ultimaLeitura).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Gráfico */}
      <Card>
        <CardContent className="pt-4 pb-2 px-2">
          <div className="flex items-center justify-between px-2 mb-3">
            <h3 className="text-sm font-semibold text-foreground">Umidade do Solo</h3>
            <div className="flex gap-1">
              {periodos.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriodo(p)}
                  className={`px-2 py-0.5 text-xs rounded-full font-medium transition-colors ${
                    periodo === p
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={leituras7dias}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" domain={[0, 60]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
              />
              <Line type="monotone" dataKey="umidade" name="Umidade %" stroke="hsl(145, 63%, 32%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(145, 63%, 32%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Monitoring;
