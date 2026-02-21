import { useState } from "react";
import { MapPin, Plus, Sprout, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { fazendas, type Fazenda, culturasPreCadastradas } from "@/data/mockData";
import { motion } from "framer-motion";

const Farms = () => {
  const [farms, setFarms] = useState<Fazenda[]>(fazendas);
  const [dialogOpen, setDialogOpen] = useState(false);

  const iconForSistema = {
    gotejamento: "💧",
    aspersao: "🌧️",
    manual: "🪣",
  };

  const handleAddFarm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newFarm: Fazenda = {
      id: String(farms.length + 1),
      nome: form.get("nome") as string,
      cidade: form.get("cidade") as string,
      estado: form.get("estado") as string,
      tamanhoHa: Number(form.get("tamanho")),
      culturaPrincipal: form.get("cultura") as string,
      tipoSolo: form.get("solo") as Fazenda["tipoSolo"],
      sistemaIrrigacao: form.get("irrigacao") as Fazenda["sistemaIrrigacao"],
    };
    setFarms([...farms, newFarm]);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Minhas Fazendas</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" /> Adicionar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Nova Fazenda / Lote</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddFarm} className="space-y-3">
              <Input name="nome" placeholder="Nome da fazenda" required className="h-11" />
              <div className="grid grid-cols-2 gap-2">
                <Input name="cidade" placeholder="Cidade" required className="h-11" />
                <Input name="estado" placeholder="UF" maxLength={2} required className="h-11" />
              </div>
              <Input name="tamanho" type="number" step="0.1" placeholder="Tamanho (ha)" required className="h-11" />
              <Select name="cultura" required>
                <SelectTrigger className="h-11"><SelectValue placeholder="Cultura principal" /></SelectTrigger>
                <SelectContent>
                  {culturasPreCadastradas.map((c) => (
                    <SelectItem key={c.nome} value={c.nome}>{c.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select name="solo" required>
                <SelectTrigger className="h-11"><SelectValue placeholder="Tipo de solo" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="arenoso">Arenoso</SelectItem>
                  <SelectItem value="argiloso">Argiloso</SelectItem>
                  <SelectItem value="misto">Misto</SelectItem>
                </SelectContent>
              </Select>
              <Select name="irrigacao" required>
                <SelectTrigger className="h-11"><SelectValue placeholder="Sistema de irrigação" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="gotejamento">Gotejamento</SelectItem>
                  <SelectItem value="aspersao">Aspersão</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" size="lg" className="w-full h-12 font-semibold">
                Salvar Fazenda
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {farms.map((farm, i) => (
          <motion.div
            key={farm.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="py-4 flex items-center gap-4">
                <div className="bg-primary/10 rounded-xl p-3">
                  <Sprout className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{farm.nome}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {farm.cidade}/{farm.estado} · {farm.tamanhoHa} ha
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {farm.culturaPrincipal} · {iconForSistema[farm.sistemaIrrigacao]} {farm.sistemaIrrigacao}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Farms;
