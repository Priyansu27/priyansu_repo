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
  Camera, 
  Upload, 
  Scan, 
  TestTube,
  Beaker,
  Thermometer,
  Droplets,
  Leaf,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Target,
  FlaskConical,
  Microscope
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function SoilScanner() {
  const [scanMethod, setScanMethod] = useState('camera');
  const [soilData, setSoilData] = useState({
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
    moisture: '',
    temperature: ''
  });
  const [scanResults, setScanResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const mockScanResults = {
    overallHealth: 78,
    soilType: 'Loamy',
    analysis: {
      pH: { value: 6.8, status: 'Good', range: '6.0-7.0', recommendation: 'Optimal for most crops' },
      nitrogen: { value: 45, status: 'Medium', range: '40-60 kg/ha', recommendation: 'Add nitrogen-rich fertilizer' },
      phosphorus: { value: 28, status: 'Low', range: '25-40 kg/ha', recommendation: 'Apply phosphorus fertilizer' },
      potassium: { value: 180, status: 'High', range: '120-280 kg/ha', recommendation: 'Good potassium levels' },
      organicMatter: { value: 3.2, status: 'Good', range: '2.5-4.0%', recommendation: 'Maintain with compost' },
      moisture: { value: 22, status: 'Optimal', range: '20-30%', recommendation: 'Perfect moisture level' }
    },
    deficiencies: [
      { nutrient: 'Phosphorus', severity: 'Medium', impact: 'May affect root development and flowering' },
      { nutrient: 'Micronutrients', severity: 'Low', impact: 'Minor impact on overall plant health' }
    ],
    recommendations: [
      {
        category: 'Fertilizer',
        priority: 'High',
        action: 'Apply DAP (Di-ammonium Phosphate) at 50 kg/acre',
        timing: 'Before sowing',
        expectedImprovement: '15-20% yield increase'
      },
      {
        category: 'Organic Matter',
        priority: 'Medium',
        action: 'Add 2-3 tons of well-decomposed farmyard manure per acre',
        timing: 'During land preparation',
        expectedImprovement: 'Improved soil structure and water retention'
      },
      {
        category: 'Micronutrients',
        priority: 'Low',
        action: 'Apply zinc sulfate and boron as foliar spray',
        timing: 'During vegetative growth',
        expectedImprovement: 'Enhanced nutrient uptake'
      }
    ],
    suitableCrops: ['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane'],
    warnings: [
      'Monitor soil moisture during dry season',
      'Avoid over-application of potassium fertilizers'
    ]
  };

  const handleCameraScan = async () => {
    setLoading(true);
    setScanProgress(0);
    
    // Simulate scanning process
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanResults(mockScanResults);
          setLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleManualAnalysis = async () => {
    if (!soilData.pH || !soilData.nitrogen || !soilData.phosphorus || !soilData.potassium) {
      alert('Please fill in all required soil parameters');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Create results based on manual input
      const results = {
        ...mockScanResults,
        analysis: {
          pH: { 
            value: parseFloat(soilData.pH), 
            status: parseFloat(soilData.pH) >= 6.0 && parseFloat(soilData.pH) <= 7.0 ? 'Good' : 'Needs Attention',
            range: '6.0-7.0',
            recommendation: parseFloat(soilData.pH) < 6.0 ? 'Apply lime to increase pH' : parseFloat(soilData.pH) > 7.0 ? 'Add organic matter to lower pH' : 'Optimal pH level'
          },
          nitrogen: { 
            value: parseFloat(soilData.nitrogen), 
            status: parseFloat(soilData.nitrogen) >= 40 ? 'Good' : 'Low',
            range: '40-60 kg/ha',
            recommendation: parseFloat(soilData.nitrogen) < 40 ? 'Apply nitrogen fertilizer' : 'Maintain current levels'
          },
          phosphorus: { 
            value: parseFloat(soilData.phosphorus), 
            status: parseFloat(soilData.phosphorus) >= 25 ? 'Good' : 'Low',
            range: '25-40 kg/ha',
            recommendation: parseFloat(soilData.phosphorus) < 25 ? 'Apply phosphorus fertilizer' : 'Good phosphorus levels'
          },
          potassium: { 
            value: parseFloat(soilData.potassium), 
            status: parseFloat(soilData.potassium) >= 120 ? 'Good' : 'Low',
            range: '120-280 kg/ha',
            recommendation: parseFloat(soilData.potassium) < 120 ? 'Apply potassium fertilizer' : 'Good potassium levels'
          },
          organicMatter: { 
            value: parseFloat(soilData.organicMatter) || 2.5, 
            status: 'Good', 
            range: '2.5-4.0%', 
            recommendation: 'Maintain with compost' 
          },
          moisture: { 
            value: parseFloat(soilData.moisture) || 25, 
            status: 'Good', 
            range: '20-30%', 
            recommendation: 'Good moisture level' 
          }
        }
      };
      setScanResults(results);
      setLoading(false);
    }, 1500);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Good': case 'Optimal': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low': case 'Needs Attention': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Scan Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microscope className="h-5 w-5" />
            Soil Analysis Method
          </CardTitle>
          <CardDescription>
            Choose how you want to analyze your soil - camera scan or manual data input
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={scanMethod} onValueChange={setScanMethod} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="camera" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Camera Scan
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <TestTube className="h-4 w-4" />
                Manual Input
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="space-y-4">
              <Card className="border-dashed border-2 border-orange-300 bg-orange-50">
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 rounded-full bg-orange-100">
                      <Camera className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-orange-800">Smart Soil Analysis</h3>
                      <p className="text-sm text-orange-600 mt-1">
                        Take a photo of your soil sample for instant AI-powered analysis
                      </p>
                    </div>
                    
                    {selectedImage ? (
                      <div className="space-y-4">
                        <img 
                          src={selectedImage} 
                          alt="Soil sample" 
                          className="w-40 h-40 object-cover rounded-lg border-2 border-orange-200"
                        />
                        <Button 
                          onClick={handleCameraScan} 
                          disabled={loading}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          <Scan className="h-4 w-4 mr-2" />
                          {loading ? 'Analyzing...' : 'Analyze Soil Sample'}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="border-orange-300 text-orange-700 hover:bg-orange-100"
                          onClick={() => document.getElementById('camera-input').click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Photo
                        </Button>
                        <Button
                          className="bg-orange-600 hover:bg-orange-700"
                          onClick={() => {
                            // Simulate taking a photo
                            setSelectedImage('/api/placeholder/200/200');
                          }}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Take Photo
                        </Button>
                      </div>
                    )}
                    
                    <input
                      id="camera-input"
                      type="file"
                      accept="image/*"
                      capture="camera"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </CardContent>
              </Card>

              {loading && (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center space-x-2">
                        <FlaskConical className="h-5 w-5 text-orange-600 animate-bounce" />
                        <span className="font-medium">Analyzing soil sample...</span>
                      </div>
                      <Progress value={scanProgress} className="w-full" />
                      <div className="text-sm text-muted-foreground">
                        {scanProgress < 30 && "Processing image..."}
                        {scanProgress >= 30 && scanProgress < 60 && "Detecting soil composition..."}
                        {scanProgress >= 60 && scanProgress < 90 && "Analyzing nutrients..."}
                        {scanProgress >= 90 && "Generating recommendations..."}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Beaker className="h-5 w-5" />
                    Soil Test Results
                  </CardTitle>
                  <CardDescription>
                    Enter your laboratory soil test results for detailed analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ph">pH Level *</Label>
                      <Input
                        id="ph"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 6.5"
                        value={soilData.pH}
                        onChange={(e) => setSoilData({...soilData, pH: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nitrogen">Nitrogen (kg/ha) *</Label>
                      <Input
                        id="nitrogen"
                        type="number"
                        placeholder="e.g., 45"
                        value={soilData.nitrogen}
                        onChange={(e) => setSoilData({...soilData, nitrogen: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phosphorus">Phosphorus (kg/ha) *</Label>
                      <Input
                        id="phosphorus"
                        type="number"
                        placeholder="e.g., 28"
                        value={soilData.phosphorus}
                        onChange={(e) => setSoilData({...soilData, phosphorus: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="potassium">Potassium (kg/ha) *</Label>
                      <Input
                        id="potassium"
                        type="number"
                        placeholder="e.g., 180"
                        value={soilData.potassium}
                        onChange={(e) => setSoilData({...soilData, potassium: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="organic-matter">Organic Matter (%)</Label>
                      <Input
                        id="organic-matter"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 3.2"
                        value={soilData.organicMatter}
                        onChange={(e) => setSoilData({...soilData, organicMatter: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="moisture">Moisture Content (%)</Label>
                      <Input
                        id="moisture"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 22"
                        value={soilData.moisture}
                        onChange={(e) => setSoilData({...soilData, moisture: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleManualAnalysis} 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading ? 'Analyzing...' : 'Analyze Soil Data'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Results */}
      {scanResults && (
        <div className="space-y-6">
          {/* Overall Health Score */}
          <Card className="bg-gradient-to-r from-green-50 via-white to-orange-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Soil Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{scanResults.overallHealth}%</div>
                  <div className="text-sm text-muted-foreground">Overall Health</div>
                  <Progress value={scanResults.overallHealth} className="w-32 mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-orange-600 mb-2">{scanResults.soilType}</div>
                  <div className="text-sm text-muted-foreground">Soil Type</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5" />
                Detailed Soil Analysis
              </CardTitle>
              <CardDescription>
                Complete breakdown of your soil's nutrient profile and characteristics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(scanResults.analysis).map(([key, data], index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium capitalize">
                        {key === 'organicMatter' ? 'Organic Matter' : key}
                      </h4>
                      <Badge variant="outline" className={getStatusColor(data.status)}>
                        {data.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">
                        {data.value}{key === 'pH' ? '' : key === 'organicMatter' || key === 'moisture' ? '%' : ' kg/ha'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Ideal: {data.range}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {data.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deficiencies */}
          {scanResults.deficiencies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Nutrient Deficiencies
                </CardTitle>
                <CardDescription>
                  Areas that need attention to improve soil health
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scanResults.deficiencies.map((deficiency, index) => (
                    <Alert key={index} className="border-orange-200 bg-orange-50">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">
                        <div className="flex items-center justify-between">
                          <span>
                            <strong>{deficiency.nutrient} deficiency</strong> - {deficiency.impact}
                          </span>
                          <Badge variant="outline" className={getStatusColor(deficiency.severity)}>
                            {deficiency.severity}
                          </Badge>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Improvement Recommendations
              </CardTitle>
              <CardDescription>
                Actionable steps to enhance your soil health and productivity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scanResults.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{rec.category}</h4>
                      <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                        {rec.priority} Priority
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-primary">{rec.action}</div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Timing:</span> {rec.timing}
                      </div>
                      <div className="text-sm text-green-600">
                        <span className="font-medium">Expected Result:</span> {rec.expectedImprovement}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suitable Crops */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                Recommended Crops
              </CardTitle>
              <CardDescription>
                Crops that will thrive in your current soil conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {scanResults.suitableCrops.map((crop, index) => (
                  <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {crop}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Warnings */}
          {scanResults.warnings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Important Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {scanResults.warnings.map((warning, index) => (
                    <Alert key={index} className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        {warning}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Getting Started Guide */}
      {!scanResults && !loading && (
        <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Microscope className="h-5 w-5" />
              How Soil Analysis Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-blue-800">Camera Scan Method</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    Take a clear photo of your soil sample
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    AI analyzes color, texture, and composition
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    Get instant results and recommendations
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-green-800">Manual Input Method</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    Enter soil test results from laboratory
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    More accurate analysis with precise data
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    Detailed recommendations for improvement
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}