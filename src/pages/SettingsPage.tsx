import { Bell, User, Ruler, Sprout, Shield, Wifi } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { culturasPreCadastradas } from "@/data/mockData";
import { useState } from "react";

const SettingsPage = () => {
  const [alertUmidade, setAlertUmidade] = useState(true);
  const [alertBateria, setAlertBateria] = useState(true);
  const [alertChuva, setAlertChuva] = useState(false);
  const [alertGeada, setAlertGeada] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Configurações</h2>

      {/* Perfil */}
      <Card>
        <CardContent className="py-4 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Perfil</h3>
          </div>
          <Input placeholder="Nome da propriedade" defaultValue="Sítio Boa Vista" className="h-11" />
          <Input placeholder="Telefone (WhatsApp)" defaultValue="(19) 99999-0000" className="h-11" />
          <Input placeholder="Email" defaultValue="produtor@email.com" className="h-11" />
        </CardContent>
      </Card>

      {/* Alertas */}
      <Card>
        <CardContent className="py-4 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Bell className="h-5 w-5 text-warning" />
            <h3 className="font-semibold text-foreground">Alertas</h3>
          </div>
          {[
            { label: "Umidade < 20%", state: alertUmidade, setter: setAlertUmidade },
            { label: "Bateria sensor < 20%", state: alertBateria, setter: setAlertBateria },
            { label: "Chuva prevista > 10 mm", state: alertChuva, setter: setAlertChuva },
            { label: "Risco de geada", state: alertGeada, setter: setAlertGeada },
          ].map(({ label, state, setter }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{label}</span>
              <Switch checked={state} onCheckedChange={setter} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Unidades */}
      <Card>
        <CardContent className="py-4 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Ruler className="h-5 w-5 text-info" />
            <h3 className="font-semibold text-foreground">Unidades</h3>
          </div>
          <Select defaultValue="mm">
            <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="mm">Milímetros (mm)</SelectItem>
              <SelectItem value="litros">Litros por planta</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Culturas */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-2 mb-3">
            <Sprout className="h-5 w-5 text-success" />
            <h3 className="font-semibold text-foreground">Culturas Cadastradas</h3>
          </div>
          <div className="space-y-2">
            {culturasPreCadastradas.map((c) => (
              <div key={c.nome} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{c.nome}</span>
                <span className="text-xs text-muted-foreground">
                  Kc: {c.kc} · {c.umidadeMin}–{c.umidadeMax}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integrações */}
      <Card>
        <CardContent className="py-4 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Wifi className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Integrações</h3>
          </div>
          <Input placeholder="API Key do clima (OpenWeatherMap)" className="h-11" />
          <Input placeholder="Webhook / API Key do IoT Gateway" className="h-11" />
          <Button variant="outline" className="w-full h-11">
            <Shield className="h-4 w-4 mr-2" />
            Testar Conexão
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
