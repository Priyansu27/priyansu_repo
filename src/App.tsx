import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { AlertTriangle, Cloud, Droplets, Leaf, TrendingUp, MapPin, Calendar, Bell, Microscope } from 'lucide-react';
import { CropYieldPredictor } from './components/CropYieldPredictor';
import { CropRecommendation } from './components/CropRecommendation';
import { WeatherSoilData } from './components/WeatherSoilData';
import { FertilizerOptimization } from './components/FertilizerOptimization';
import { SoilScanner } from './components/SoilScanner';
import { Dashboard } from './components/Dashboard';
import { LanguageSelector } from './components/LanguageSelector';
import { getTranslation } from './components/LanguageContent';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const menuItems = [
    { id: 'dashboard', labelKey: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'yield-prediction', labelKey: 'yieldPrediction', label: 'Crop Yield Prediction', icon: Leaf },
    { id: 'crop-recommendation', labelKey: 'cropRecommendation', label: 'Crop Recommendations', icon: TrendingUp },
    { id: 'weather-soil', labelKey: 'weatherSoil', label: 'Weather & Soil Data', icon: Cloud },
    { id: 'fertilizer-irrigation', labelKey: 'fertilizerIrrigation', label: 'Fertilizer & Irrigation', icon: Droplets },
    { id: 'soil-scanner', labelKey: 'soilScanner', label: 'Soil Scanner', icon: Microscope },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'yield-prediction':
        return <CropYieldPredictor />;
      case 'crop-recommendation':
        return <CropRecommendation />;
      case 'weather-soil':
        return <WeatherSoilData />;
      case 'fertilizer-irrigation':
        return <FertilizerOptimization />;
      case 'soil-scanner':
        return <SoilScanner />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-b from-orange-500 via-white to-green-600 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Leaf className="h-5 w-5" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-sidebar-foreground">Kisan Pragati</h2>
                <p className="text-xs text-sidebar-foreground/60">
                  🇮🇳 {getTranslation('subtitle', selectedLanguage)}
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <div className="px-4 py-3 border-b border-sidebar-border">
              <div className="text-xs text-sidebar-foreground/60 mb-2">Language / भाषा</div>
              <LanguageSelector 
                onLanguageChange={setSelectedLanguage}
              />
            </div>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      isActive={activeSection === item.id}
                      className="w-full justify-start"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {getTranslation(item.labelKey, selectedLanguage)}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-semibold">
                  {getTranslation(menuItems.find(item => item.id === activeSection)?.labelKey || 'dashboard', selectedLanguage)}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {activeSection === 'dashboard' && getTranslation('welcomeMessage', selectedLanguage)}
                  {activeSection === 'yield-prediction' && getTranslation('yieldPredictionDesc', selectedLanguage)}
                  {activeSection === 'crop-recommendation' && getTranslation('cropRecommendationDesc', selectedLanguage)}
                  {activeSection === 'weather-soil' && getTranslation('weatherSoilDesc', selectedLanguage)}
                  {activeSection === 'fertilizer-irrigation' && getTranslation('fertilizerIrrigationDesc', selectedLanguage)}
                  {activeSection === 'soil-scanner' && getTranslation('soilScannerDesc', selectedLanguage)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector 
                variant="compact" 
                onLanguageChange={setSelectedLanguage} 
              />
              <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                <Bell className="h-4 w-4 mr-2" />
                {getTranslation('alerts', selectedLanguage)}
              </Button>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="h-2 w-2 rounded-full bg-green-600 mr-1" />
                {getTranslation('systemOnline', selectedLanguage)}
              </Badge>
            </div>
          </div>

          <div className="p-6">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}