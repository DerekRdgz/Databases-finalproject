'use client'

import React, { useState } from 'react';
import { Menu, X, User, Calendar, FileText, FolderOpen, BarChart2, Settings, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Casos', href: '/casos', icon: FolderOpen },
    { name: 'Calendario', href: '/calendario', icon: Calendar },
    { name: 'Documentos', href: '/documentos', icon: FileText },
    { name: 'Reportes', href: '/reportes', icon: BarChart2 },
    { name: 'Configuración', href: '/configuracion', icon: Settings },
  ];

  return (
    <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo y Título */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white text-xl font-bold">LegalTech</span>
              </div>
              
              {/* Links de Navegación Desktop */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Menú Usuario Desktop */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Mi Perfil
                </button>
                <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Salir
                </button>
              </div>
            </div>

            {/* Botón Mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú Mobile */}
        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </a>
                );
              })}
              <a
                href="/perfil"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                Mi Perfil
              </a>
              <a
                href="/logout"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;