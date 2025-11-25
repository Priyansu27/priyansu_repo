import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Droplets, 
  Leaf, 
  Calculator, 
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Settings,
  Zap
} from 'lucide-react';

export function FertilizerOptimization() {
  const [cropType, setCropType] = useState('');
  const [fieldSize, setFieldSize] = useState('');
  const [soilType, setSoilType] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const cropTypes = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Potato', 'Tomato'];
  const soilTypes = ['Loamy', 'Clay', 'Sandy', 'Silty'];
  const growthStages = ['Seedling', 'Vegetative', 'Flowering', 'Fruit Development', 'Maturity'];

  const mockOptimizationResults = {
    fertilizer: {
      recommendations: [
        {
          type: 'Nitrogen (Urea)',
          quantity: 120,
          unit: 'kg/acre',
          timing: 'Split application: 40kg at sowing, 40kg at tillering, 40kg at flowering',
          cost: '₹3,600',
          benefits: 'Promotes leaf growth and protein synthesis'
        },
        {
          type: 'Phosphorus (DAP)',
          quantity: 60,
          unit: 'kg/acre',
          timing: 'Full dose at sowing as basal application',
          cost: '₹2,400',
          benefits: 'Enhances root development and early establishment'
        },
        {
          type: 'Potassium (MOP)',
          quantity: 40,
          unit: 'kg/acre',
          timing: 'Split: 20kg at sowing, 20kg at flowering',
          cost: '₹1,600',
          benefits: 'Improves disease resistance and grain quality'
        }
      ],
      totalCost: '₹7,600',
      expectedYieldIncrease: '15-20%',
      paybackPeriod: '1 season'
    },
    irrigation: {
      schedule: [
        {
          stage: 'Sowing to Germination',
          frequency: 'Light irrigation every 2-3 days',
          amount: '25mm per application',
          duration: '15 days',
          criticalPeriod: true
        },
        {
          stage: 'Vegetative Growth',
          frequency: 'Every 7-10 days',
          amount: '40mm per application',
          duration: '45 days',
          criticalPeriod: false
        },
        {
          stage: 'Flowering',
          frequency: 'Every 5-7 days',
          amount: '50mm per application',
          duration: '20 days',
          criticalPeriod: true
        },
        {
          stage: 'Grain Filling',
          frequency: 'Every 7-10 days',
          amount: '45mm per application',
          duration: '25 days',
          criticalPeriod: true
        }
      ],
      totalWaterRequirement: '450-500mm',
      waterSavings: '20-25%',
      method: 'Drip irrigation recommended'
    },
    schedule: [
      {
        week: 1,
        tasks: ['Apply basal fertilizer (DAP + MOP)', 'Sowing', 'Light irrigation'],
        priority: 'high'
      },
      {
        week: 4,
        tasks: ['First nitrogen application', 'Weed management', 'Regular irrigation'],
        priority: 'high'
      },
      {
        week: 8,
        tasks: ['Second nitrogen application', 'Pest monitoring', 'Irrigation adjustment'],
        priority: 'medium'
      },
      {
        week: 12,
        tasks: ['Final nitrogen application', 'Disease prevention', 'Critical irrigation'],
        priority: 'high'
      }
    ]
  };

  const handleOptimization = async () => {
    if (!cropType || !fieldSize || !soilType || !growthStage) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setOptimizationResults(mockOptimizationResults);
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
              <Settings className="h-5 w-5" />
              Optimization Parameters
            </CardTitle>
            <CardDescription>
              Configure your crop and field details for personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crop-type">Crop Type *</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="field-size">Field Size (acres) *</Label>
              <Input
                id="field-size"
                type="number"
                placeholder="Enter field size"
                value={fieldSize}
                onChange={(e) => setFieldSize(e.target.value)}
              />
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
              <Label htmlFor="growth-stage">Current Growth Stage *</Label>
              <Select value={growthStage} onValueChange={setGrowthStage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select growth stage" />
                </SelectTrigger>
                <SelectContent>
                  {growthStages.map((stage) => (
                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleOptimization} 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Optimizing...' : 'Generate Recommendations'}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2">
          {loading && (
            <Card>
              <CardContent className="flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p>Analyzing soil conditions and crop requirements...</p>
                  <Progress value={60} className="w-full" />
                </div>
              </CardContent>
            </Card>
          )}

          {optimizationResults && !loading && (
            <Tabs defaultValue="fertilizer" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="fertilizer" className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Fertilizer
                </TabsTrigger>
                <TabsTrigger value="irrigation" className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Irrigation
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule
                </TabsTrigger>
              </TabsList>

              <TabsContent value="fertilizer" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Fertilizer Recommendations
                    </CardTitle>
                    <CardDescription>
                      Optimized nutrient management plan for {cropType}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {optimizationResults.fertilizer.recommendations.map((rec, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-lg">{rec.type}</h4>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {rec.quantity} {rec.unit}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Application:</span>
                            <div className="font-medium mt-1">{rec.timing}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Estimated Cost:</span>
                            <div className="font-medium mt-1 text-primary">{rec.cost}</div>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-md">
                          <div className="text-sm text-blue-800">
                            <strong>Benefits:</strong> {rec.benefits}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="p-4 bg-gradient-to-r from-orange-50 via-white to-green-50 rounded-lg border border-orange-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-orange-600">{optimizationResults.fertilizer.totalCost}</div>
                          <div className="text-sm text-muted-foreground">Total Investment</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{optimizationResults.fertilizer.expectedYieldIncrease}</div>
                          <div className="text-sm text-muted-foreground">Yield Increase</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{optimizationResults.fertilizer.paybackPeriod}</div>
                          <div className="text-sm text-muted-foreground">Payback Period</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="irrigation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="h-5 w-5" />
                      Smart Irrigation Schedule
                    </CardTitle>
                    <CardDescription>
                      Water-efficient irrigation plan optimized for {cropType}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {optimizationResults.irrigation.schedule.map((stage, index) => (
                      <div key={index} className={`p-4 border rounded-lg ${stage.criticalPeriod ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{stage.stage}</h4>
                          {stage.criticalPeriod && (
                            <Badge variant="destructive" className="text-xs">
                              Critical Period
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Frequency:</span>
                            <div className="font-medium">{stage.frequency}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Amount:</span>
                            <div className="font-medium">{stage.amount}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Duration:</span>
                            <div className="font-medium">{stage.duration}</div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="p-4 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg border border-blue-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{optimizationResults.irrigation.totalWaterRequirement}</div>
                          <div className="text-sm text-muted-foreground">Total Water Need</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{optimizationResults.irrigation.waterSavings}</div>
                          <div className="text-sm text-muted-foreground">Water Savings</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-orange-600">{optimizationResults.irrigation.method}</div>
                          <div className="text-sm text-muted-foreground">Recommended Method</div>
                        </div>
                      </div>
                    </div>

                    <Alert className="border-blue-200 bg-blue-50">
                      <Droplets className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        <strong>Smart Tip:</strong> Monitor soil moisture levels and adjust irrigation timing based on weather forecasts to optimize water usage.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Integrated Management Schedule
                    </CardTitle>
                    <CardDescription>
                      Week-by-week action plan combining fertilizer and irrigation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {optimizationResults.schedule.map((week, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Week {week.week}
                          </h4>
                          <Badge 
                            variant={week.priority === 'high' ? 'destructive' : week.priority === 'medium' ? 'default' : 'secondary'}
                            className={
                              week.priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' :
                              week.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                              'bg-gray-100 text-gray-800 border-gray-200'
                            }
                          >
                            {week.priority} priority
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {week.tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span>{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <Alert className="border-green-200 bg-green-50">
                      <Zap className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        <strong>Pro Tip:</strong> Set up automated reminders for critical tasks and monitor weather forecasts to adjust timing as needed.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {!optimizationResults && !loading && (
            <Card>
              <CardContent className="flex items-center justify-center p-8">
                <div className="text-center space-y-2">
                  <Calculator className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3>No Recommendations Yet</h3>
                  <p className="text-muted-foreground">
                    Fill in your crop details to get optimized fertilizer and irrigation recommendations
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