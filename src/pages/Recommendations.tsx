import { useState } from "react";
import { Droplets, Clock, CheckCircle2, PlusCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { recomendacoes, irrigacoes, fazendas } from "@/data/mockData";
import { motion } from "framer-motion";

const Recommendations = () => {
  const fazenda = fazendas[0];
  const recsHoje = recomendacoes.filter((r) => r.fazendaId === fazenda.id && !r.aplicada);
  const recsPassadas = recomendacoes.filter((r) => r.fazendaId === fazenda.id && r.aplicada);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRegistrar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Recomendações</h2>
      <p className="text-sm text-muted-foreground">{fazenda.nome}</p>

      {/* Recomendação principal */}
      {recsHoje.map((rec, i) => (
        <motion.div
          key={rec.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <Card className="border-2 border-primary/30 bg-primary/5">
            <CardContent className="py-5">
              <div className="flex items-start gap-3">
                <div className="bg-primary rounded-xl p-2.5">
                  <Droplets className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-foreground">
                    Irrigar {rec.quantidadeMm} mm
                  </p>
                  <p className="text-sm text-primary font-medium flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {rec.horarioSugerido}
                  </p>
                  <div className="mt-3 bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground flex items-start gap-1">
                      <AlertTriangle className="h-3.5 w-3.5 mt-0.5 text-warning shrink-0" />
                      {rec.motivo}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Registrar irrigação manual */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button size="lg" variant="outline" className="w-full h-14 text-base font-semibold gap-2">
            <PlusCircle className="h-5 w-5" />
            Registrar Irrigação Manual
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Registrar Irrigação</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegistrar} className="space-y-3">
            <Input name="data" type="date" className="h-11" required />
            <Input name="hora" type="time" className="h-11" required />
            <Input name="mm" type="number" step="0.1" placeholder="Quantidade (mm)" className="h-11" required />
            <Button type="submit" size="lg" className="w-full h-12 font-semibold">
              Salvar
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Histórico */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Histórico</h3>
        <div className="space-y-2">
          {recsPassadas.map((rec) => (
            <Card key={rec.id}>
              <CardContent className="py-3 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {rec.quantidadeMm} mm sugerido · {rec.quantidadeAplicada} mm aplicado
                  </p>
                  <p className="text-xs text-muted-foreground">{rec.data} · {rec.horarioSugerido}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          {irrigacoes
            .filter((i) => i.fazendaId === fazenda.id)
            .map((irr) => (
              <Card key={irr.id}>
                <CardContent className="py-3 flex items-center gap-3">
                  <Droplets className="h-5 w-5 text-info shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {irr.quantidadeMm} mm ({irr.tipo})
                    </p>
                    <p className="text-xs text-muted-foreground">{irr.data} às {irr.hora}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
