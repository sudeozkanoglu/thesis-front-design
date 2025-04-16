import React from "react";
import { Card, CardContent, Button } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { Check, X, Clock, Brain, Target, Award, BookOpen } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const ShowResult = () => {
  const router = useRouter();
  const mockResults = {
    examName: "Midterm Examination",
    studentScore: 85,
    totalQuestions: 5,
    correctAnswers: 4,
    timeSpent: "45 minutes",
    questions: [
      {
        id: 1,
        question:
          "Artificial intelligence (AI) is revolutionizing industries by enabling machines to learn and adapt to complex tasks. From natural language processing to image recognition, AI systems are designed to mimic human intelligence. These technologies are now being widely used in healthcare, finance, and autonomous vehicles, making processes faster and more efficient.",
        studentAnswer:
          "Yapay zeka (AI), makinelerin öğrenmesini ve karmaşık görevleri gerçekleştirmesini sağlayarak endüstrileri dönüştürüyor. Doğal dil işleme ve görüntü tanıma gibi alanlarda yapay zeka sistemleri, insan zekasını taklit etmek üzere tasarlanmıştır. Bu teknolojiler, süreçleri daha hızlı ve verimli hale getirerek sağlık, finans ve otonom araçlar gibi birçok sektörde yaygın bir şekilde kullanılmaktadır.",
        correctAnswer:
          "Yapay zeka (AI), makinelerin öğrenmesini ve karmaşık görevleri gerçekleştirmesini sağlayarak endüstrileri dönüştürüyor. Doğal dil işleme ve görüntü tanıma gibi alanlarda yapay zeka sistemleri, insan zekasını taklit etmek üzere tasarlanmıştır. Bu teknolojiler, süreçleri daha hızlı ve verimli hale getirerek sağlık, finans ve otonom araçlar gibi birçok sektörde yaygın bir şekilde kullanılmaktadır.",
        isCorrect: true,
        timeSpent: 8,
      },
      {
        id: 2,
        question:
          "Network security is a critical aspect of modern computing, ensuring that sensitive data is protected from unauthorized access. Firewalls, encryption, and intrusion detection systems are some of the tools used to safeguard networks. As cyber threats continue to evolve, maintaining robust security protocols has become essential for organizations.",
        studentAnswer:
          "Ağ güvenliği, modern bilişimin kritik bir unsurudur ve hassas verilerin yetkisiz erişimden korunmasını sağlar. Güvenlik duvarları, şifreleme ve izinsiz giriş tespit sistemleri, ağları korumak için kullanılan araçlardan bazılarıdır. Siber tehditler evrildikçe, güçlü güvenlik protokollerini sürdürmek, organizasyonlar için zorunlu hale gelmiştir.",
        correctAnswer:
          "Ağ güvenliği, modern bilişimin kritik bir unsurudur ve hassas verilerin yetkisiz erişimden korunmasını sağlar. Güvenlik duvarları, şifreleme ve izinsiz giriş tespit sistemleri, ağları korumak için kullanılan araçlardan bazılarıdır. Siber tehditler evrildikçe, güçlü güvenlik protokollerini sürdürmek, organizasyonlar için zorunlu hale gelmiştir.",
        isCorrect: true,
        timeSpent: 5,
      },
      {
        id: 3,
        question:
          "Programming languages are the backbone of software development. Each language, such as Python, Java, or C++, has unique features suited for specific applications. For instance, Python is popular for machine learning and data analysis, while C++ is often used in game development and system programming.",
        studentAnswer:
          "Programlama dilleri, yazılım geliştirmenin temelini oluşturur. Python, Java veya C++ gibi her bir dil, belirli uygulamalar için uygun olan benzersiz özelliklere sahiptir. Örneğin, Python, makine öğrenimi ve veri analizi için popülerken, C++ genellikle oyun geliştirme ve sistem programlamasında kullanılmaktadır.",
        correctAnswer:
          "Programlama dilleri, yazılım geliştirmenin temelini oluşturur. Python, Java veya C++ gibi her bir dil, belirli uygulamalar için uygun olan benzersiz özelliklere sahiptir. Örneğin, Python, makine öğrenimi ve veri analizi için popülerken, C++ genellikle oyun geliştirme ve sistem programlamasında kullanılmaktadır.",
        isCorrect: true,
        timeSpent: 12,
      },
      {
        id: 4,
        question:
          "Big data refers to the massive volume of data generated by digital devices and online platforms. Analyzing this data helps organizations gain insights into customer behavior, optimize operations, and make informed decisions. Tools like Hadoop and Spark are widely used to process and analyze big data efficiently",
        studentAnswer:
          "Büyük veri, dijital cihazlar ve çevrimiçi platformlar tarafından üretilen devasa veri hacmini ifade eder. Bu verilerin analiz edilmesi, organizasyonların müşteri davranışlarını anlamalarına, operasyonlarını optimize etmelerine ve bilinçli kararlar almalarına yardımcı olur. Hadoop ve Spark gibi araçlar, büyük veriyi verimli bir şekilde işlemek ve analiz etmek için yaygın olarak kullanılmaktadır.",
        correctAnswer:
          "Büyük veri, dijital cihazlar ve çevrimiçi platformlar tarafından üretilen devasa veri hacmini ifade eder. Bu verilerin analiz edilmesi, organizasyonların müşteri davranışlarını anlamalarına, operasyonlarını optimize etmelerine ve bilinçli kararlar almalarına yardımcı olur. Hadoop ve Spark gibi araçlar, büyük veriyi verimli bir şekilde işlemek ve analiz etmek için yaygın olarak kullanılmaktadır.",
        isCorrect: true,
        timeSpent: 7,
      },
      {
        id: 5,
        question:
          "Cloud computing has transformed the way businesses manage their IT infrastructure. By storing data and applications on remote servers, organizations can access resources on demand, reduce costs, and improve scalability. Cloud services like Amazon Web Services (AWS) and Microsoft Azure are leading this technological shift.",
        studentAnswer:
          "Bulut bilişim, işletmelerin fiziksel depolama cihazlarını tamamen ortadan kaldırmasına neden olur. Veriler ve uygulamalar uzak sunucularda saklandığından, organizasyonlar bu kaynaklara nadiren erişebilir. Amazon Web Services (AWS) ve Microsoft Azure gibi bulut hizmetleri, çoğunlukla bireylerin kişisel kullanımına yöneliktir ve büyük ölçekli işletmeler için uygun değildir.",
        correctAnswer:
          "Bulut bilişim, işletmelerin BT altyapılarını yönetme biçimini dönüştürmüştür. Verilerin ve uygulamaların uzak sunucularda saklanmasıyla, organizasyonlar bu kaynaklara ihtiyaç duyduklarında erişebilir, maliyetlerini azaltabilir ve ölçeklenebilirliklerini artırabilir. Amazon Web Services (AWS) ve Microsoft Azure gibi bulut hizmetleri, bu teknolojik değişimin öncüsü olmuştur.",
        isCorrect: false,
        timeSpent: 13,
      },
    ],
  };

  const performanceData = mockResults.questions.map((q, index) => ({
    name: `Q${index + 1}`,
    score: q.isCorrect ? 100 : 0,
    time: q.timeSpent,
  }));

  const pieData = [
    { name: "Correct", value: mockResults.correctAnswers, color: "#22c55e" },
    {
      name: "Incorrect",
      value: mockResults.totalQuestions - mockResults.correctAnswers,
      color: "#ef4444",
    },
  ];

  const subjectPerformance = [
    { name: "Speaking Assestment A", score: 100 },
    { name: "Speaking Assestment B", score: 80 },
    { name: "Speaking Assestment C", score: 50 },
    { name: "Midterm", score: 100 },
    { name: "Final", score: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-2 pt-4 px-6 flex items-center justify-between">
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-6 p-6">
        {/* Left side - Results */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader
              className="flex items-center justify-between"
              title="Exam Results"
              titleTypographyProps={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "text.primary",
              }}
              subheaderTypographyProps={{
                fontSize: "1rem",
                fontWeight: "normal",
                color: "text.secondary",
              }}
              subheader="Midterm Examination"
              avatar={<Award className="w-8 h-8 text-blue-500" />}
            />
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl">
                  <Target className="w-6 h-6 text-blue-500 mb-2" />
                  <span className="text-2xl font-bold text-gray-800">
                    {mockResults.studentScore}
                  </span>
                  <span className="text-sm text-gray-500">Total Score</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl">
                  <Brain className="w-6 h-6 text-green-500 mb-2" />
                  <span className="text-2xl font-bold text-gray-800">
                    {mockResults.correctAnswers}/{mockResults.totalQuestions}
                  </span>
                  <span className="text-sm text-gray-500">Correct</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-purple-50 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-500 mb-2" />
                  <span className="text-2xl font-bold text-gray-800">
                    {mockResults.timeSpent}
                  </span>
                  <span className="text-sm text-gray-500">Duration</span>
                </div>
              </div>

              <div className="space-y-4">
                {mockResults.questions.map((q) => (
                  <div
                    key={q.id}
                    className={`p-4 rounded-lg border-l-4 transition-all hover:shadow-md
                      ${
                        q.isCorrect
                          ? "border-l-green-500 bg-green-50"
                          : "border-l-red-500 bg-red-50"
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          q.isCorrect ? "bg-green-200" : "bg-red-200"
                        }`}
                      >
                        {q.isCorrect ? (
                          <Check className="w-4 h-4 text-green-700" />
                        ) : (
                          <X className="w-4 h-4 text-red-700" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {q.question}
                        </p>
                        <div className="mt-2 text-sm">
                          <p
                            className={
                              q.isCorrect ? "text-green-700" : "text-red-700"
                            }
                          >
                            Your answer: {q.studentAnswer}
                          </p>
                          {!q.isCorrect && (
                            <p className="text-green-700 mt-1">
                              Correct answer: {q.correctAnswer}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {q.timeSpent}m
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Analytics */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader
              className="flex items-center justify-between"
              titleTypographyProps={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "text.primary",
              }}
              title="Analytics"
              subheaderTypographyProps={{
                fontSize: "1rem",
                fontWeight: "normal",
                color: "text.secondary",
              }}
              subheader="Midterm Examination"
              avatar={<BookOpen className="w-8 h-8 text-blue-500" />}
            />
            <CardContent>
              <div className="col-span-2 p-4 mt-3">
                {/* Score Distribution */}
                <div className="bg-white p-4 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Score Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend
                        align="center"
                        verticalAlign="bottom"
                        iconSize={10}
                        layout="horizontal"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Time Per */}
                <div className="bg-white p-4 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Time per Question
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={performanceData} barSize={30}>
                      <defs>
                        <linearGradient
                          id="barGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#4CAF50"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor="#8BC34A"
                            stopOpacity={0.5}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar
                        dataKey="time"
                        fill="url(#barGradient)"
                        radius={[10, 10, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Subject Performance */}
                <div className="col-span-2 bg-white p-4 rounded-xl mt-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Performance by Subject
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={subjectPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShowResult;
