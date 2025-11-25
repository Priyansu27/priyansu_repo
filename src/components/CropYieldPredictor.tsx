import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AlertCircle, TrendingUp, BarChart3, Brain } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';

export function CropYieldPredictor() {
  const [cropType, setCropType] = useState('');
  const [soilType, setSoilType] = useState('');
  const [area, setArea] = useState('');
  const [previousYield, setPreviousYield] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const cropTypes = [
    'Wheat', 'Rice', 'Maize', 'Barley', 'Cotton', 'Sugarcane', 'Potato', 'Tomato', 'Onion', 'Soybean'
  ];

  const soilTypes = [
    'Loamy', 'Clay', 'Sandy', 'Silty', 'Peaty', 'Chalky'
  ];

  const scenarios = [
    {
      name: 'Optimal Conditions',
      rainfall: 'High (800-1000mm)',
      fertilizer: 'Recommended amount',
      yield: 4.2,
      confidence: 92
    },
    {
      name: 'Average Conditions',
      rainfall: 'Normal (600-800mm)',
      fertilizer: '80% of recommended',
      yield: 3.8,
      confidence: 88
    },
    {
      name: 'Drought Scenario',
      rainfall: 'Low (400-600mm)',
      fertilizer: 'Recommended amount',
      yield: 2.9,
      confidence: 85
    },
    {
      name: 'Excess Rain',
      rainfall: 'Very High (>1000mm)',
      fertilizer: 'Reduced amount',
      yield: 3.2,
      confidence: 82
    }
  ];

  const handlePrediction = async () => {
    if (!cropType || !soilType || !area) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const basePrediction = {
        crop: cropType,
        area: parseFloat(area),
        soilType: soilType,
        scenarios: scenarios.map(scenario => ({
          ...scenario,
          totalProduction: (scenario.yield * parseFloat(area)).toFixed(1)
        })),
        recommendations: [
          'Consider using high-yield variety seeds for better results',
          'Apply fertilizer in 3 split doses for optimal nutrient uptake',
          'Monitor soil moisture levels regularly during critical growth stages',
          'Use drip irrigation to optimize water usage'
        ]
      };
      setPrediction(basePrediction);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Prediction Inputs
            </CardTitle>
            <CardDescription>
              Enter your farm details to get AI-powered yield predictions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crop-type">Crop Type *</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="soil-type">Soil Type *</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Farm Area (acres) *</Label>
              <Input
                id="area"
                type="number"
                placeholder="Enter area in acres"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="previous-yield">Previous Year Yield (tons/acre)</Label>
              <Input
                id="previous-yield"
                type="number"
                placeholder="Enter previous yield"
                value={previousYield}
                onChange={(e) => setPreviousYield(e.target.value)}
              />
            </div>

            <Button 
              onClick={handlePrediction} 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Generating Prediction...' : 'Predict Yield'}
            </Button>
          </CardContent>
        </Card>

        {/* Prediction Results */}
        <div className="lg:col-span-2 space-y-6">
          {loading && (
            <Card>
              <CardContent className="flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p>Analyzing soil conditions, weather patterns, and historical data...</p>
                  <Progress value={75} className="w-full" />
                </div>
              </CardContent>
            </Card>
          )}

          {prediction && !loading && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Yield Prediction Results
                  </CardTitle>
                  <CardDescription>
                    Multiple scenario forecasts for {prediction.crop} on {prediction.area} acres
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prediction.scenarios.map((scenario, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border-2 ${
                          scenario.name === 'Optimal Conditions' 
                            ? 'border-green-200 bg-green-50' 
                            : scenario.name === 'Average Conditions'
                            ? 'border-orange-200 bg-orange-50'
                            : 'border-blue-200 bg-blue-50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{scenario.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {scenario.confidence}% confidence
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground mb-3">
                          <p>Rainfall: {scenario.rainfall}</p>
                          <p>Fertilizer: {scenario.fertilizer}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-2xl font-bold text-primary">{scenario.yield}</div>
                            <div className="text-xs text-muted-foreground">tons/acre</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold">{scenario.totalProduction}</div>
                            <div className="text-xs text-muted-foreground">total tons</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>
                    Actionable insights to maximize your crop yield
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {prediction.recommendations.map((recommendation, index) => (
                      <Alert key={index} className={`${
                        index % 3 === 0 ? 'border-orange-200 bg-orange-50' :
                        index % 3 === 1 ? 'border-green-200 bg-green-50' :
                        'border-blue-200 bg-blue-50'
                      }`}>
                        <TrendingUp className={`h-4 w-4 ${
                          index % 3 === 0 ? 'text-orange-600' :
                          index % 3 === 1 ? 'text-green-600' :
                          'text-blue-600'
                        }`} />
                        <AlertDescription className={`${
                          index % 3 === 0 ? 'text-orange-800' :
                          index % 3 === 1 ? 'text-green-800' :
                          'text-blue-800'
                        }`}>
                          {recommendation}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!prediction && !loading && (
            <Card>
              <CardContent className="flex items-center justify-center p-8">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3>No Predictions Yet</h3>
                  <p className="text-muted-foreground">
                    Fill in the form to get AI-powered yield predictions for your crops
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}