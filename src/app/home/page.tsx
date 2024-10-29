import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  // Datos de ejemplo
  const stats = [
    { title: "Casos Activos", value: "28", icon: Briefcase, trend: "+2 esta semana" },
    { title: "Audiencias Pendientes", value: "12", icon: Calendar, trend: "4 esta semana" },
    { title: "Horas Registradas", value: "164", icon: Clock, trend: "Este mes" },
    { title: "Clientes Totales", value: "45", icon: Users, trend: "+3 este mes" },
  ];

  const proximasAudiencias = [
    { cliente: "María González", tipo: "Audiencia Preliminar", fecha: "25 Oct, 2024", hora: "10:00 AM" },
    { cliente: "Juan Pérez", tipo: "Presentación de Pruebas", fecha: "26 Oct, 2024", hora: "11:30 AM" },
    { cliente: "Carlos Ruiz", tipo: "Audiencia Final", fecha: "27 Oct, 2024", hora: "09:00 AM" },
  ];

  const casosUrgentes = [
    { titulo: "Demanda Laboral - Empresa XYZ", vencimiento: "2 días", prioridad: "Alta" },
    { titulo: "Contrato Mercantil - Import/Export", vencimiento: "3 días", prioridad: "Media" },
    { titulo: "Recurso de Amparo - Caso ABC", vencimiento: "5 días", prioridad: "Alta" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Legal</h1>
          <p className="mt-2 text-gray-600">Bienvenido al sistema de gestión de casos legales</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                      <p className="text-sm text-gray-500 mt-1">{stat.trend}</p>
                    </div>
                    <Icon className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Próximas Audiencias */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Próximas Audiencias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proximasAudiencias.map((audiencia, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{audiencia.cliente}</p>
                      <p className="text-sm text-gray-500">{audiencia.tipo}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{audiencia.fecha}</p>
                      <p className="text-sm text-gray-500">{audiencia.hora}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Casos Urgentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Casos Urgentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {casosUrgentes.map((caso, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{caso.titulo}</p>
                      <p className="text-sm text-gray-500">Vence en: {caso.vencimiento}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      caso.prioridad === 'Alta' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {caso.prioridad}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Briefcase className="h-5 w-5" />
                  Nuevo Caso
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  <Calendar className="h-5 w-5" />
                  Agendar Audiencia
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  <TrendingUp className="h-5 w-5" />
                  Ver Reportes
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;