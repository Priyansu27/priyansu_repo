import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { TrendingUp, Leaf, DollarSign, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function CropRecommendation() {
  const [soilHealth, setSoilHealth] = useState('');
  const [season, setSeason] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [marketDemand, setMarketDemand] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const soilHealthOptions = ['Excellent', 'Good', 'Fair', 'Poor'];
  const seasonOptions = ['Kharif (Summer)', 'Rabi (Winter)', 'Zaid (Spring)'];
  const budgetOptions = ['Low (< ₹50,000/acre)', 'Medium (₹50,000-₹1,00,000/acre)', 'High (> ₹1,00,000/acre)'];
  const marketDemandOptions = ['High', 'Medium', 'Low'];

  const mockRecommendations = [
    {
      crop: 'Wheat',
      suitability: 95,
      investmentCost: '₹45,000',
      expectedRevenue: '₹85,000',
      profit: '₹40,000',
      profitMargin: 47,
      growingPeriod: '120-150 days',
      riskLevel: 'Low',
      marketPrice: '₹2,500/quintal',
      reasons: [
        'Excellent match for your soil pH and nutrient levels',
        'High market demand in current season',
        'Low water requirement suits current climate conditions',
        'Good profit margins with stable market prices'
      ],
      tips: [
        'Use certified seeds for better yield',
        'Apply fertilizer in 3 split doses',
        'Monitor for rust diseases during flowering'
      ]
    },
    {
      crop: 'Mustard',
      suitability: 88,
      investmentCost: '₹25,000',
      expectedRevenue: '₹55,000',
      profit: '₹30,000',
      profitMargin: 55,
      growingPeriod: '90-120 days',
      riskLevel: 'Medium',
      marketPrice: '₹4,500/quintal',
      reasons: [
        'Well-suited for winter season planting',
        'Lower investment with good returns',
        'Oil extraction adds value to produce',
        'Strong export market demand'
      ],
      tips: [
        'Ensure proper drainage in fields',
        'Use aphid-resistant varieties',
        'Harvest at right maturity for oil content'
      ]
    },
    {
      crop: 'Barley',
      suitability: 82,
      investmentCost: '₹35,000',
      expectedRevenue: '₹65,000',
      profit: '₹30,000',
      profitMargin: 46,
      growingPeriod: '100-120 days',
      riskLevel: 'Low',
      marketPrice: '₹2,200/quintal',
      reasons: [
        'Drought-tolerant crop suitable for water scarcity',
        'Good fodder value increases overall returns',
        'Shorter growing period allows for crop rotation',
        'Stable market with brewery demand'
      ],
      tips: [
        'Plant early for better grain quality',
        'Avoid waterlogging during grain filling',
        'Consider malting barley for premium prices'
      ]
    }
  ];

  const handleRecommendation = async () => {
    if (!soilHealth || !season || !budgetRange || !marketDemand) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 2000);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Farm Analysis
            </CardTitle>
            <CardDescription>
              Tell us about your farm conditions for personalized crop recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="soil-health">Soil Health Status *</Label>
              <Select value={soilHealth} onValueChange={setSoilHealth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil health" />
                </SelectTrigger>
                <SelectContent>
                  {soilHealthOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="season">Planting Season *</Label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  {seasonOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Investment Budget *</Label>
              <Select value={budgetRange} onValueChange={setBudgetRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="market-demand">Market Demand *</Label>
              <Select value={marketDemand} onValueChange={setMarketDemand}>
                <SelectTrigger>
                  <SelectValue placeholder="Select market demand" />
                </SelectTrigger>
                <SelectContent>
                  {marketDemandOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleRecommendation} 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Get Recommendations'}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {loading && (
            <Card>
              <CardContent className="flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p>Analyzing soil conditions, market trends, and profitability...</p>
                  <Progress value={65} className="w-full" />
                </div>
              </CardContent>
            </Card>
          )}

          {recommendations && !loading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recommended Crops</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {recommendations.length} options found
                </Badge>
              </div>

              {recommendations.map((rec, index) => (
                <Card key={index} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold">#{index + 1}</span>
                        </div>
                        {rec.crop}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {rec.suitability}% match
                        </Badge>
                        <Badge variant="outline" className={getRiskColor(rec.riskLevel)}>
                          {rec.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                    <Progress value={rec.suitability} className="h-2" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Financial Analysis */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-orange-50 via-white to-green-50 rounded-lg border border-orange-200">
                      <div>
                        <div className="text-sm text-muted-foreground">Investment</div>
                        <div className="font-semibold text-orange-600">{rec.investmentCost}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Expected Revenue</div>
                        <div className="font-semibold text-green-600">{rec.expectedRevenue}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Profit</div>
                        <div className="font-semibold text-blue-600">{rec.profit}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Profit Margin</div>
                        <div className="font-semibold text-green-600">{rec.profitMargin}%</div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Growing Period:</span>
                        <div className="font-medium">{rec.growingPeriod}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Market Price:</span>
                        <div className="font-medium">{rec.marketPrice}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Risk Level:</span>
                        <div className="font-medium">{rec.riskLevel}</div>
                      </div>
                    </div>

                    {/* Reasons */}
                    <div>
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Why this crop is recommended
                      </h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {rec.reasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tips */}
                    <div>
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        Success Tips
                      </h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {rec.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!recommendations && !loading && (
            <Card>
              <CardContent className="flex items-center justify-center p-8">
                <div className="text-center space-y-2">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3>No Recommendations Yet</h3>
                  <p className="text-muted-foreground">
                    Fill in your farm details to get personalized crop recommendations
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