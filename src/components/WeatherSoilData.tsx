import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Cloud, 
  Droplets, 
  Thermometer, 
  Wind, 
  Sun, 
  CloudRain, 
  AlertTriangle,
  TrendingUp,
  Activity,
  MapPin,
  RefreshCw
} from 'lucide-react';

export function WeatherSoilData() {
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const weatherData = {
    current: {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      rainfall24h: 2.5,
      uvIndex: 7,
      visibility: 8,
      pressure: 1013,
      condition: 'Partly Cloudy'
    },
    forecast: [
      { day: 'Today', temp: { high: 32, low: 24 }, condition: 'Partly Cloudy', rain: 10 },
      { day: 'Tomorrow', temp: { high: 30, low: 22 }, condition: 'Sunny', rain: 0 },
      { day: 'Day 3', temp: { high: 29, low: 21 }, condition: 'Cloudy', rain: 40 },
      { day: 'Day 4', temp: { high: 27, low: 20 }, condition: 'Rainy', rain: 80 },
      { day: 'Day 5', temp: { high: 26, low: 19 }, condition: 'Rainy', rain: 70 }
    ]
  };

  const soilData = {
    moisture: 45,
    temperature: 24,
    ph: 6.8,
    nitrogen: 65,
    phosphorus: 58,
    potassium: 72,
    organicMatter: 3.2,
    salinity: 0.8
  };

  const alerts = [
    {
      type: 'warning',
      title: 'Heavy Rain Expected',
      message: 'Heavy rainfall predicted in next 48 hours. Consider drainage preparation.',
      severity: 'high',
      time: '2 hours ago'
    },
    {
      type: 'info',
      title: 'Optimal Irrigation Window',
      message: 'Current soil moisture levels suggest irrigation in evening hours.',
      severity: 'medium',
      time: '4 hours ago'
    },
    {
      type: 'alert',
      title: 'Pest Risk Alert',
      message: 'High humidity and temperature create favorable conditions for aphids.',
      severity: 'medium',
      time: '6 hours ago'
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date());
    }, 1500);
  };

  const getConditionIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="h-4 w-4 text-yellow-500" />;
      case 'cloudy': case 'partly cloudy': return <Cloud className="h-4 w-4 text-gray-500" />;
      case 'rainy': return <CloudRain className="h-4 w-4 text-blue-500" />;
      default: return <Sun className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getSoilHealthColor = (value, optimal) => {
    const percentage = (value / optimal) * 100;
    if (percentage >= 80 && percentage <= 120) return 'text-green-600';
    if (percentage >= 60 && percentage <= 140) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header with refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Environmental Monitoring</h2>
          <p className="text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <Button 
          onClick={handleRefresh} 
          variant="outline" 
          disabled={refreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <Alert 
            key={index} 
            className={
              alert.severity === 'high' ? 'border-red-200 bg-red-50' :
              alert.severity === 'medium' ? 'border-orange-200 bg-orange-50' :
              'border-blue-200 bg-blue-50'
            }
          >
            <AlertTriangle className={`h-4 w-4 ${
              alert.severity === 'high' ? 'text-red-600' :
              alert.severity === 'medium' ? 'text-orange-600' :
              'text-blue-600'
            }`} />
            <AlertDescription>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{alert.title}</div>
                  <div className="text-sm">{alert.message}</div>
                </div>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </div>

      <Tabs defaultValue="weather" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weather" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            Weather Data
          </TabsTrigger>
          <TabsTrigger value="soil" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Soil Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weather" className="space-y-6">
          {/* Current Weather */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Current Weather Conditions
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Farm Location • Live Data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <Thermometer className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{weatherData.current.temperature}°C</div>
                  <div className="text-sm text-muted-foreground">Temperature</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{weatherData.current.humidity}%</div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <Wind className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{weatherData.current.windSpeed}</div>
                  <div className="text-sm text-muted-foreground">km/h Wind</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <CloudRain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{weatherData.current.rainfall24h}</div>
                  <div className="text-sm text-muted-foreground">mm (24h)</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm text-muted-foreground">UV Index</span>
                  <span className="font-medium">{weatherData.current.uvIndex}</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm text-muted-foreground">Visibility</span>
                  <span className="font-medium">{weatherData.current.visibility} km</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm text-muted-foreground">Pressure</span>
                  <span className="font-medium">{weatherData.current.pressure} hPa</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather Forecast */}
          <Card>
            <CardHeader>
              <CardTitle>5-Day Weather Forecast</CardTitle>
              <CardDescription>Plan your agricultural activities accordingly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getConditionIcon(day.condition)}
                      <div>
                        <div className="font-medium">{day.day}</div>
                        <div className="text-sm text-muted-foreground">{day.condition}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{day.temp.high}° / {day.temp.low}°</div>
                        <div className="text-sm text-muted-foreground">{day.rain}% rain</div>
                      </div>
                      <div className="w-16">
                        <Progress value={day.rain} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="soil" className="space-y-6">
          {/* Soil Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time Soil Analysis
              </CardTitle>
              <CardDescription>
                Live data from soil sensors across your farm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Soil Moisture</span>
                    <Droplets className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{soilData.moisture}%</div>
                  <Progress value={soilData.moisture} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">Optimal: 40-60%</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Soil Temperature</span>
                    <Thermometer className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{soilData.temperature}°C</div>
                  <div className="text-xs text-muted-foreground">Ideal for root growth</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">pH Level</span>
                    <Activity className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{soilData.ph}</div>
                  <div className="text-xs text-muted-foreground">Slightly acidic</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Salinity</span>
                    <Activity className="h-4 w-4 text-purple-500" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{soilData.salinity}</div>
                  <div className="text-xs text-muted-foreground">dS/m</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nutrient Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Soil Nutrient Analysis</CardTitle>
              <CardDescription>NPK levels and organic matter content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Nitrogen (N)</div>
                    <div className="text-sm text-muted-foreground">Essential for leaf growth</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{soilData.nitrogen}%</div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      Good
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Phosphorus (P)</div>
                    <div className="text-sm text-muted-foreground">Important for root development</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600">{soilData.phosphorus}%</div>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
                      Moderate
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Potassium (K)</div>
                    <div className="text-sm text-muted-foreground">Enhances disease resistance</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{soilData.potassium}%</div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      Excellent
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Organic Matter</div>
                    <div className="text-sm text-muted-foreground">Improves soil structure</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{soilData.organicMatter}%</div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      Good
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Soil Management Recommendations</CardTitle>
              <CardDescription>Based on current soil analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Alert className="border-blue-200 bg-blue-50">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Phosphorus Enhancement:</strong> Consider adding phosphate fertilizer to improve root development and flowering.
                  </AlertDescription>
                </Alert>
                <Alert className="border-green-200 bg-green-50">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Maintain pH:</strong> Current pH level is ideal for most crops. Monitor regularly to maintain this level.
                  </AlertDescription>
                </Alert>
                <Alert className="border-orange-200 bg-orange-50">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Irrigation Timing:</strong> With current moisture levels, consider irrigation in evening hours for optimal absorption.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}