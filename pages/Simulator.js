import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, Droplets, Zap, TrendingDown, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export default function Simulator() {
  // Estados para água
  const [showerMinutes, setShowerMinutes] = useState(15);
  const [showerFrequency, setShowerFrequency] = useState(2);
  const [washingMachineUses, setWashingMachineUses] = useState(3);

  // Estados para energia
  const [ledBulbs, setLedBulbs] = useState(0);
  const [acHours, setAcHours] = useState(8);
  const [acTemperature, setAcTemperature] = useState(18);

  // Cálculos de economia de água
  const currentWaterPerShower = showerMinutes * 6; // 6L/min
  const improvedWaterPerShower = Math.max(5, showerMinutes - 5) * 6;
  const dailyShowerWater = currentWaterPerShower * showerFrequency;
  const improvedDailyShowerWater = improvedWaterPerShower * showerFrequency;
  const monthlyShowerSavings = (dailyShowerWater - improvedDailyShowerWater) * 30;

  const currentWashingWater = washingMachineUses * 135; // 135L por uso
  const improvedWashingWater = Math.max(1, washingMachineUses - 1) * 135;
  const weeklyWashingSavings = currentWashingWater - improvedWashingWater;
  const monthlyWashingSavings = weeklyWashingSavings * 4;

  const totalWaterSavings = monthlyShowerSavings + monthlyWashingSavings;
  const waterCostSavings = (totalWaterSavings / 1000) * 28.85; // R$ 28.85/m³

  // Cálculos de economia de energia
  const currentLighting = (10 - ledBulbs) * 60 * 5; // Incandescentes 60W, 5h/dia
  const improvedLighting = ledBulbs * 9 * 5 + (10 - ledBulbs) * 60 * 5; // LED 9W
  const monthlyLightingSavings = ((currentLighting - improvedLighting) / 1000) * 30;

  const currentACEnergy = acHours * 1.5; // 1.5kW médio
  const tempAdjustmentFactor = (acTemperature - 23) * 0.08; // Cada grau = 8% mais consumo
  const adjustedACEnergy = currentACEnergy * (1 + tempAdjustmentFactor);
  const improvedACEnergy = Math.max(0, acHours - 2) * 1.5 * (1 + Math.max(-0.16, tempAdjustmentFactor - 0.16));
  const monthlyACSavings = (adjustedACEnergy - improvedACEnergy) * 30;

  const totalEnergySavings = monthlyLightingSavings + monthlyACSavings;
  const energyCostSavings = totalEnergySavings * 0.85; // R$ 0.85/kWh

  const totalMonthlySavings = waterCostSavings + energyCostSavings;

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-blue-50 via-cyan-50/40 to-amber-50/30 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Calculator className="w-10 h-10 text-purple-600" />
            Simulador de Economia
          </h1>
          <p className="text-gray-600">Veja quanto você pode economizar mudando seus hábitos</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Coluna de simulação de água */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5" />
                  Simulação de Água
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Tempo de Banho: {showerMinutes} min
                  </Label>
                  <Slider
                    value={[showerMinutes]}
                    onValueChange={(v) => setShowerMinutes(v[0])}
                    min={5}
                    max={30}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-xs text-gray-600">
                    Reduza para {Math.max(5, showerMinutes - 5)} min
                  </p>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Banhos por Dia: {showerFrequency}
                  </Label>
                  <Slider
                    value={[showerFrequency]}
                    onValueChange={(v) => setShowerFrequency(v[0])}
                    min={1}
                    max={4}
                    step={1}
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Máquina de Lavar/Semana: {washingMachineUses}
                  </Label>
                  <Slider
                    value={[washingMachineUses]}
                    onValueChange={(v) => setWashingMachineUses(v[0])}
                    min={1}
                    max={7}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-xs text-gray-600">
                    Reduza para {Math.max(1, washingMachineUses - 1)} vez(es)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna de simulação de energia */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Simulação de Energia
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Lâmpadas LED: {ledBulbs} de 10
                  </Label>
                  <Slider
                    value={[ledBulbs]}
                    onValueChange={(v) => setLedBulbs(v[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-xs text-gray-600">
                    Troque mais {10 - ledBulbs} lâmpada(s) por LED
                  </p>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Ar Condicionado: {acHours}h/dia
                  </Label>
                  <Slider
                    value={[acHours]}
                    onValueChange={(v) => setAcHours(v[0])}
                    min={0}
                    max={24}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-xs text-gray-600">
                    Reduza para {Math.max(0, acHours - 2)}h/dia
                  </p>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Temperatura AC: {acTemperature}°C
                  </Label>
                  <Slider
                    value={[acTemperature]}
                    onValueChange={(v) => setAcTemperature(v[0])}
                    min={16}
                    max={28}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-xs text-gray-600">
                    Aumente para {Math.min(28, acTemperature + 2)}°C
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna de resultados */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5" />
                    Economia Potencial
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="text-center pb-6 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-600 mb-2">Economia Total Mensal</p>
                    <p className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      R$ {totalMonthlySavings.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">por mês</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-2 text-sm font-medium text-blue-900">
                          <Droplets className="w-4 h-4" />
                          Água
                        </span>
                        <span className="font-bold text-blue-700">R$ {waterCostSavings.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-600">{totalWaterSavings.toFixed(0)} litros/mês</p>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-2 text-sm font-medium text-amber-900">
                          <Zap className="w-4 h-4" />
                          Energia
                        </span>
                        <span className="font-bold text-amber-700">R$ {energyCostSavings.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-600">{totalEnergySavings.toFixed(1)} kWh/mês</p>
                    </div>
                  </div>

                  <div className="bg-green-100 border border-green-300 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-green-900">Em 1 ano:</p>
                        <p className="text-2xl font-bold text-green-700">
                          R$ {(totalMonthlySavings * 12).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
          <p className="text-sm text-purple-800">
            💡 <strong>Dica:</strong> Implemente essas mudanças gradualmente e acompanhe seus resultados no painel principal!
          </p>
        </div>
      </div>
    </div>
  );
}