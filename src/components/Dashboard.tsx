import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import {
  TrendingUp,
  Cloud,
  Droplets,
  Leaf,
  AlertTriangle,
  Sun,
  CloudRain,
  Thermometer,
  Wind,
  ArrowUp,
  ArrowDown,
  Quote,
  Star,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import farmerTestimonial from "figma:asset/b0d4bccedabbe785dbdee4f5b6a03904746e775d.png";

export function Dashboard() {
  const weatherData = {
    temperature: 28,
    humidity: 65,
    rainfall: 12,
    windSpeed: 8,
    condition: "Partly Cloudy",
  };

  const cropData = [
    {
      name: "Wheat",
      area: 25,
      predictedYield: 3.2,
      status: "Good",
    },
    {
      name: "Rice",
      area: 15,
      predictedYield: 4.1,
      status: "Excellent",
    },
    {
      name: "Maize",
      area: 10,
      predictedYield: 2.8,
      status: "Fair",
    },
  ];

  const alerts = [
    {
      type: "warning",
      message: "Low soil moisture detected in Field A",
      time: "2 hours ago",
    },
    {
      type: "info",
      message:
        "Optimal planting window for winter crops opens in 5 days",
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Testimonial Section */}
      <Card className="overflow-hidden bg-gradient-to-r from-orange-50 via-white to-green-50 border-orange-200">
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 fill-orange-400 text-orange-400"
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  5.0 Rating
                </span>
              </div>
              <Quote className="h-8 w-8 text-orange-600 mb-4" />
              <blockquote className="text-xl font-medium text-foreground mb-4">
                "Kisan Pragati transformed my farming! Yield
                increased by 18% and I save 30% on fertilizers.
                The AI predictions are amazingly accurate."
              </blockquote>
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-semibold text-primary">
                    Rajesh Kumar Singh
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Progressive Farmer, Punjab
                  </div>
                  <div className="text-sm text-green-600">
                    🌾 25 years farming experience
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  Start Your Journey
                </Button>
                <Button
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  View Success Stories
                </Button>
              </div>
            </div>
            <div className="relative h-80 lg:h-full">
              <ImageWithFallback
                src={farmerTestimonial}
                alt="Happy farmer showing Kisan Pragati app results"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="text-center p-6 border-green-200 bg-green-50">
          <div className="text-3xl font-bold text-green-700 mb-2">
            10,000+
          </div>
          <div className="text-sm text-green-600">
            Happy Farmers
          </div>
        </Card>
        <Card className="text-center p-6 border-orange-200 bg-orange-50">
          <div className="text-3xl font-bold text-orange-700 mb-2">
            ₹2.5Cr+
          </div>
          <div className="text-sm text-orange-600">
            Revenue Increased
          </div>
        </Card>
        <Card className="text-center p-6 border-blue-200 bg-blue-50">
          <div className="text-3xl font-bold text-blue-700 mb-2">
            25%
          </div>
          <div className="text-sm text-blue-600">
            Avg. Yield Increase
          </div>
        </Card>
      </div>

      {/* Weather Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Temperature
            </CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weatherData.temperature}°C
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                2°C from yesterday
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Humidity
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weatherData.humidity}%
            </div>
            <p className="text-xs text-muted-foreground">
              Optimal range
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rainfall
            </CardTitle>
            <CloudRain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weatherData.rainfall}mm
            </div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Wind Speed
            </CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weatherData.windSpeed} km/h
            </div>
            <p className="text-xs text-muted-foreground">
              Gentle breeze
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recent Alerts
          </CardTitle>
          <CardDescription>
            Important notifications for your farms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert, index) => (
            <Alert
              key={index}
              className={
                alert.type === "warning"
                  ? "border-orange-200 bg-orange-50"
                  : "border-blue-200 bg-blue-50"
              }
            >
              <AlertTriangle
                className={`h-4 w-4 ${alert.type === "warning" ? "text-orange-600" : "text-blue-600"}`}
              />
              <AlertDescription className="flex justify-between items-center">
                <span>{alert.message}</span>
                <span className="text-xs text-muted-foreground">
                  {alert.time}
                </span>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Feature Spotlight */}
      <Card className="bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">
                🚀 Unlock Premium Features
              </h3>
              <p className="text-blue-100 mb-4">
                Get advanced AI insights, detailed analytics,
                and personalized farming strategies. Join
                10,000+ farmers achieving 25% higher yields!
              </p>
              <div className="flex gap-3">
                <Button className="bg-white text-green-600 hover:bg-gray-100">
                  Explore AI Features
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  ₹50,000
                </div>
                <div className="text-xs text-blue-100">
                  Avg. Extra Revenue
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">7 Days</div>
                <div className="text-xs text-blue-100">
                  Free Trial
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crop Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Crop Overview
          </CardTitle>
          <CardDescription>
            Current crop status and predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cropData.map((crop, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{crop.name}</h4>
                    <Badge
                      variant={
                        crop.status === "Excellent"
                          ? "default"
                          : crop.status === "Good"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        crop.status === "Excellent"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : crop.status === "Good"
                            ? "bg-orange-100 text-orange-800 border-orange-200"
                            : "bg-blue-100 text-blue-800 border-blue-200"
                      }
                    >
                      {crop.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Area: {crop.area} acres • Predicted Yield:{" "}
                    {crop.predictedYield} tons/acre
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">
                    {(crop.area * crop.predictedYield).toFixed(
                      1,
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total tons
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium mb-1">
              Yield Prediction
            </h3>
            <p className="text-xs text-muted-foreground text-center">
              Get AI-powered crop yield forecasts
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-green-600">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Leaf className="h-8 w-8 text-orange-600 mb-2" />
            <h3 className="font-medium mb-1">
              Crop Recommendations
            </h3>
            <p className="text-xs text-muted-foreground text-center">
              Find the best crops for your soil
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-600">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Cloud className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium mb-1">Weather Data</h3>
            <p className="text-xs text-muted-foreground text-center">
              Real-time weather and soil monitoring
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Droplets className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium mb-1">
              Fertilizer Optimizer
            </h3>
            <p className="text-xs text-muted-foreground text-center">
              Optimize fertilizer and irrigation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Success Stories Section */}
      <Card className="bg-gradient-to-br from-green-50 to-orange-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Star className="h-5 w-5 fill-green-600 text-green-600" />
            Real Stories, Real Results
          </CardTitle>
          <CardDescription>
            See how farmers across India are transforming their
            yields with Kisan Pragati
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-white/70 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  P
                </div>
                <div>
                  <div className="font-semibold">
                    Priya Devi
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Haryana
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                "Saved 40% on water usage with smart irrigation
                recommendations!"
              </p>
              <div className="text-xs text-green-600">
                +22% yield increase
              </div>
            </div>

            <div className="p-4 bg-white/70 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div>
                  <div className="font-semibold">
                    Amrit Patel
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Gujarat
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                "Weather alerts helped me protect my crops from
                unexpected rain."
              </p>
              <div className="text-xs text-orange-600">
                Prevented ₹80,000 loss
              </div>
            </div>

            <div className="p-4 bg-white/70 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div>
                  <div className="font-semibold">
                    Suresh Reddy
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Telangana
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                "AI crop recommendations doubled my cotton
                profits this season!"
              </p>
              <div className="text-xs text-blue-600">
                100% ROI improvement
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              View All Success Stories
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}