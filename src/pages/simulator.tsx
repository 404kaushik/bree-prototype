import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'
import AIFinancialAdvisor from '../components/AIFinancialAdvisor'

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// Define types for our financial data
type FinancialScenario = {
  name: string
  description: string
  icon: string
  color: string
}

type FinancialData = {
  currentIncome: number
  currentExpenses: number
  currentSavings: number
  currentDebt: number
  yearsToProject: number
}

type TimelinePoint = {
  year: number
  savings: number
  debt: number
  netWorth: number
}

export default function Simulator() {
  // Financial scenarios
  const scenarios: FinancialScenario[] = [
    {
      name: 'Pay Down Debt',
      description: 'Prioritize paying off high-interest debt before saving or investing',
      icon: '💰',
      color: 'rgb(239, 68, 68)' // red-500
    },
    {
      name: 'Emergency Fund',
      description: 'Build a 3-6 month emergency fund for financial security',
      icon: '🛡️',
      color: 'rgb(59, 130, 246)' // blue-500
    },
    {
      name: 'Investment Growth',
      description: 'Invest in diversified portfolio for long-term growth',
      icon: '📈',
      color: 'rgb(16, 185, 129)' // green-500
    },
    {
      name: 'Home Purchase',
      description: 'Save for a down payment on a home purchase',
      icon: '🏠',
      color: 'rgb(139, 92, 246)' // purple-500
    },
  ]

  // State for financial data
  const [financialData, setFinancialData] = useState<FinancialData>({
    currentIncome: 5000, // Monthly income
    currentExpenses: 3500, // Monthly expenses
    currentSavings: 10000, // Current savings
    currentDebt: 25000, // Current debt
    yearsToProject: 10, // Years to project into the future
  })

  // State for selected scenario
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].name)
  
  // State for timeline data
  const [timelineData, setTimelineData] = useState<TimelinePoint[]>([])
  
  // State for animation
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Ref for chart
  const chartRef = useRef<any>(null)

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFinancialData({
      ...financialData,
      [name]: parseFloat(value) || 0
    })
  }

  // Calculate timeline based on selected scenario and financial data
  const calculateTimeline = () => {
    setIsAnimating(true)
    
    const timeline: TimelinePoint[] = []
    let { currentSavings, currentDebt } = financialData
    const monthlySurplus = financialData.currentIncome - financialData.currentExpenses
    
    // Different calculation logic based on selected scenario
    for (let year = 0; year <= financialData.yearsToProject; year++) {
      let savings = currentSavings
      let debt = currentDebt
      
      if (selectedScenario === 'Pay Down Debt') {
        // Prioritize debt payment
        const yearlyPayment = Math.min(monthlySurplus * 12 * 0.7, debt)
        debt = Math.max(0, debt - yearlyPayment)
        savings += monthlySurplus * 12 * 0.3 + (yearlyPayment > debt ? yearlyPayment - debt : 0)
        
        // Apply interest
        debt *= 1.18 // 18% interest on debt
        savings *= 1.02 // 2% interest on savings
      } 
      else if (selectedScenario === 'Emergency Fund') {
        // Build emergency fund first
        const targetEmergencyFund = financialData.currentExpenses * 6 // 6 months of expenses
        
        if (savings < targetEmergencyFund) {
          // Prioritize emergency fund
          const yearlyPayment = Math.min(monthlySurplus * 12 * 0.8, targetEmergencyFund - savings)
          savings += yearlyPayment
          debt = Math.max(0, debt - (monthlySurplus * 12 * 0.2))
        } else {
          // After emergency fund is built, focus on debt
          const yearlyPayment = Math.min(monthlySurplus * 12 * 0.6, debt)
          debt = Math.max(0, debt - yearlyPayment)
          savings += monthlySurplus * 12 * 0.4
        }
        
        // Apply interest
        debt *= 1.18 // 18% interest on debt
        savings *= 1.02 // 2% interest on savings
      }
      else if (selectedScenario === 'Investment Growth') {
        // Focus on investments
        const yearlyInvestment = monthlySurplus * 12 * 0.6
        savings += yearlyInvestment
        debt = Math.max(0, debt - (monthlySurplus * 12 * 0.4))
        
        // Apply interest with higher return on investments
        debt *= 1.18 // 18% interest on debt
        savings *= 1.07 // 7% return on investments
      }
      else if (selectedScenario === 'Home Purchase') {
        // Save for home down payment
        const yearlyHomeSavings = monthlySurplus * 12 * 0.7
        savings += yearlyHomeSavings
        debt = Math.max(0, debt - (monthlySurplus * 12 * 0.3))
        
        // Apply interest
        debt *= 1.18 // 18% interest on debt
        savings *= 1.03 // 3% interest on savings (higher yield accounts)
        
        // If enough for down payment (20% of $400k home)
        if (year > 0 && savings >= 80000 && !timeline.some(point => point.savings >= 80000)) {
          // Simulate home purchase
          savings -= 80000
          debt += 320000 // Mortgage
        }
      }
      
      // Calculate net worth
      const netWorth = savings - debt
      
      // Add to timeline
      timeline.push({
        year,
        savings,
        debt,
        netWorth
      })
      
      // Update for next iteration
      currentSavings = savings
      currentDebt = debt
    }
    
    // Update timeline data
    setTimelineData(timeline)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0
    }).format(value)
  }

  // Prepare chart data
  const chartData = {
    labels: timelineData.map(point => `Year ${point.year}`),
    datasets: [
      {
        label: 'Net Worth',
        data: timelineData.map(point => point.netWorth),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Savings',
        data: timelineData.map(point => point.savings),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'transparent',
        tension: 0.4
      },
      {
        label: 'Debt',
        data: timelineData.map(point => point.debt),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'transparent',
        tension: 0.4
      }
    ]
  }

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value: any) {
            return formatCurrency(value);
          }
        }
      }
    }
  }

  // Calculate timeline on initial load and when inputs change
  useEffect(() => {
    calculateTimeline()
  }, [selectedScenario])

  return (
    <>
      <Head>
        <title>Financial Simulator | Bree</title>
        <meta name="description" content="Simulate your financial future with Bree's Financial Time Machine" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">Bree</Link>
            </div>
            <nav>
              <ul className="flex space-x-8">
                <li><Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">Home</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <motion.h1 
                className="text-3xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Financial Time Machine Simulator
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                See how different financial strategies impact your future. Adjust your current situation and select a scenario to visualize your financial journey.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Financial Inputs */}
              <div className="lg:col-span-1">
                <motion.div 
                  className="bg-white rounded-xl shadow-md p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Current Situation</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentIncome" className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Income
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="currentIncome"
                          id="currentIncome"
                          className="input-field pl-7 block w-full"
                          value={financialData.currentIncome}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="currentExpenses" className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Expenses
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="currentExpenses"
                          id="currentExpenses"
                          className="input-field pl-7 block w-full"
                          value={financialData.currentExpenses}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="currentSavings" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Savings
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="currentSavings"
                          id="currentSavings"
                          className="input-field pl-7 block w-full"
                          value={financialData.currentSavings}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="currentDebt" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Debt
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="currentDebt"
                          id="currentDebt"
                          className="input-field pl-7 block w-full"
                          value={financialData.currentDebt}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="yearsToProject" className="block text-sm font-medium text-gray-700 mb-1">
                        Years to Project
                      </label>
                      <input
                        type="range"
                        name="yearsToProject"
                        id="yearsToProject"
                        min="1"
                        max="30"
                        className="input-field block w-full"
                        value={financialData.yearsToProject}
                        onChange={handleInputChange}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 year</span>
                        <span>{financialData.yearsToProject} years</span>
                        <span>30 years</span>
                      </div>
                    </div>
                    
                    <button
                      className="btn-primary w-full mt-6"
                      onClick={calculateTimeline}
                    >
                      Update Projection
                    </button>
                  </div>
                </motion.div>
                
                {/* Scenarios */}
                <motion.div 
                  className="bg-white rounded-xl shadow-md p-6 mt-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Scenarios</h2>
                  
                  <div className="space-y-3">
                    {scenarios.map((scenario) => (
                      <div 
                        key={scenario.name}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${selectedScenario === scenario.name ? 'bg-primary-50 border-2 border-primary-500' : 'bg-gray-50 hover:bg-gray-100'}`}
                        onClick={() => setSelectedScenario(scenario.name)}
                      >
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{scenario.icon}</div>
                          <div>
                            <h3 className="font-medium text-gray-900">{scenario.name}</h3>
                            <p className="text-sm text-gray-600">{scenario.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* Financial Visualization */}
              <div className="lg:col-span-2">
                <motion.div 
                  className="bg-white rounded-xl shadow-md p-6 h-full"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Financial Timeline</h2>
                    <div className="text-sm font-medium text-primary-600">
                      Projecting {financialData.yearsToProject} years into the future
                    </div>
                  </div>
                  
                  {/* Chart */}
                  <div className="relative h-80 mb-8">
                    {isAnimating && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                      </div>
                    )}
                    <Line ref={chartRef} data={chartData} options={chartOptions} />
                  </div>
                  
                  {/* Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {timelineData.length > 0 && (
                      <>
                        <div className="bg-green-50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-green-800 mb-1">Final Savings</h3>
                          <p className="text-2xl font-bold text-green-700">
                            {formatCurrency(timelineData[timelineData.length - 1].savings)}
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            Started with {formatCurrency(timelineData[0].savings)}
                          </p>
                        </div>
                        
                        <div className="bg-red-50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-red-800 mb-1">Final Debt</h3>
                          <p className="text-2xl font-bold text-red-700">
                            {formatCurrency(timelineData[timelineData.length - 1].debt)}
                          </p>
                          <p className="text-xs text-red-600 mt-1">
                            Started with {formatCurrency(timelineData[0].debt)}
                          </p>
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-blue-800 mb-1">Net Worth Change</h3>
                          <p className="text-2xl font-bold text-blue-700">
                            {formatCurrency(timelineData[timelineData.length - 1].netWorth - timelineData[0].netWorth)}
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            {((timelineData[timelineData.length - 1].netWorth - timelineData[0].netWorth) / Math.abs(timelineData[0].netWorth) * 100).toFixed(0)}% change over {financialData.yearsToProject} years
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Key Insights */}
                  {timelineData.length > 0 && (
                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h3>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <ul className="space-y-2 text-sm text-gray-700">
                          {selectedScenario === 'Pay Down Debt' && (
                            <>
                              <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                {timelineData[timelineData.length - 1].debt <= 0 ? 
                                  `You'll be debt-free in approximately ${timelineData.findIndex(point => point.debt <= 0)} years.` : 
                                  `You'll still have ${formatCurrency(timelineData[timelineData.length - 1].debt)} in debt after ${financialData.yearsToProject} years.`}
                              </li>
                              <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                By prioritizing debt payment, you're saving approximately {formatCurrency(financialData.currentDebt * 0.18)} per year in interest charges.
                              </li>
                              <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                Your monthly surplus of {formatCurrency(financialData.currentIncome - financialData.currentExpenses)} gives you good capacity to tackle debt.
                              </li>
                            </>
                          )}
                          
                          {selectedScenario === 'Emergency Fund' && (
                            <>
                              <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                Your target emergency fund of {formatCurrency(financialData.currentExpenses * 6)} will be reached in approximately {Math.ceil((financialData.currentExpenses * 6 - financialData.currentSavings) / (financialData.currentIncome - financialData.currentExpenses) / 12 * 10) / 10} years.
                              </li>
                              <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                Having this emergency fund will protect you from unexpected expenses and reduce the need for high-interest debt.
                              </li>
                              <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                After building your emergency fund, you'll be able to accelerate debt repayment and wealth building.
                              </li>
                            </>
                          )}
                          
                          {selectedScenario === 'Investment Growth' && (
                            <>
                              <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                With a 7% average annual return, your investments will grow to {formatCurrency(timelineData[timelineData.length - 1].savings)} in {financialData.yearsToProject} years.
                              </li>
                              <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                The power of compound interest means your money will grow exponentially over time.
                              </li>
                              <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                By year {Math.floor(financialData.yearsToProject / 2)}, your investment returns will be approximately {formatCurrency(timelineData[Math.floor(financialData.yearsToProject / 2)].savings * 0.07)} per year.
                              </li>
                            </>
                          )}
                          
                          {selectedScenario === 'Home Purchase' && (
                            <>
                              <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                {timelineData.some(point => point.savings >= 80000) ? 
                                  `You'll have enough for a 20% down payment on a $400,000 home in approximately ${timelineData.findIndex(point => point.savings >= 80000)} years.` : 
                                  `You'll need to save for more than ${financialData.yearsToProject} years to reach a 20% down payment on a $400,000 home.`}
                              </li>
                              <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                {timelineData.some(point => point.savings >= 80000) ? 
                                  `After purchasing a home, your net worth will continue to grow as you build equity.` : 
                                  `Increasing your monthly savings rate will help you reach your down payment goal faster.`}
                              </li>
                              <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                Home ownership can be a good long-term investment, but remember to factor in maintenance costs, property taxes, and insurance.
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* AI Financial Advisor */}
                  {timelineData.length > 0 && (
                    <AIFinancialAdvisor 
                      financialData={financialData}
                      timelineData={timelineData}
                      selectedScenario={selectedScenario}
                    />
                  )}
                </motion.div>
              </div>
            </div>
            
            {/* Time Travel Feature */}
            <motion.div 
              className="mt-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl shadow-lg p-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h2 className="text-2xl font-bold mb-4">The Power of Time</h2>
                  <p className="text-lg opacity-90 mb-4">
                    Small changes today can have a massive impact on your financial future. The Financial Time Machine helps you see these effects clearly.
                  </p>
                  <p className="text-lg opacity-90">
                    Try adjusting your monthly savings by just $100 and see how it compounds over {financialData.yearsToProject} years!
                  </p>
                  <p className='text-xs italic mt-1'>(Note: When you click on save $100, your monthly expenses above decreases by $100, hit update projects to see the change.)</p>
                </div>
                <div className="flex-shrink-0">
                  <button 
                    className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition-colors"
                    onClick={() => {
                      setFinancialData({
                        ...financialData,
                        currentExpenses: financialData.currentExpenses - 100
                      })
                      setTimeout(() => calculateTimeline(), 100)
                    }}
                  >
                    Save $100 More Monthly
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Bree Financial. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}