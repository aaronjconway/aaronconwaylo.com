import Util from "./Util"

import React from 'react';
import calculator from './calculator';
import DefaultStyles from './styles.module.css';


const DefaultPrice = 500000;
const DefaultDownPayment = 125000;
const DefaultInterestRate = 0.0625;
const DefaultTermMonths = 360;
const DefaultTaxRate = 0.0125;
const DefaultInsuranceRate = .003;
const DefaultMortgageInsuranceRate = 0.003;
const DefaultDownPaymentPercent = 0.2;
const DefaultAdditionalPrincipalPayment = 0;

const ValidTermMonths = [60, 120, 180, 240, 360];
const loanType = ['conventional', 'fha', 'va', 'jumbo'];

export default class MortgageCalculator extends React.Component {

  mortgageCalculator = calculator.createMortgageCalculator();

  constructor(props) {
    super(props);

    this.mortgageCalculator.totalPrice = Util.numberValueOrDefault(props.price, 0, DefaultPrice);
    this.mortgageCalculator.downPayment = Util.numberValueOrDefault(props.downPayment, 0, DefaultDownPayment);
    this.mortgageCalculator.interestRate = Util.numberValueOrDefault(props.interestRate, 0, DefaultInterestRate);
    this.mortgageCalculator.months = Util.numberValueInSetOrDefault(props.months, ValidTermMonths, DefaultTermMonths);
    this.mortgageCalculator.taxRate = Util.numberValueOrDefault(props.taxRate, 0, DefaultTaxRate);
    this.mortgageCalculator.insuranceRate = Util.numberValueOrDefault(props.insuranceRate, 0, DefaultInsuranceRate);
    this.mortgageCalculator.mortgageInsuranceRate = Util.numberValueOrDefault(props.mortgageInsuranceRate, 0, DefaultMortgageInsuranceRate);
    this.mortgageCalculator.mortgageInsuranceEnabled = props.mortgageInsuranceEnabled !== false;
    this.mortgageCalculator.additionalPrincipal = Util.numberValueOrDefault(props.additionalPrincipalPayment, 0, DefaultAdditionalPrincipalPayment);
    this.mortgageCalculator.loanType = 'conventional';


    this.state = {
      totalPrice: this.mortgageCalculator.totalPrice,
      downPayment: this.mortgageCalculator.downPayment,
      mortgageInsuranceRate: this.mortgageCalculator.mortgageInsuranceRate,
      mortgageInsuranceEnabled: this.mortgageCalculator.mortgageInsuranceEnabled,
      additionalPrincipal: 0,
      associationDues: 0,
      loanType: this.mortgageCalculator.loanType,
      mortgage: this.mortgageCalculator.calculatePayment()
    };

    this.onPriceChange = this.onPriceChange.bind(this);
    this.onDownPaymentChange = this.onDownPaymentChange.bind(this);
    this.onDownPaymentPercentChange = this.onDownPaymentPercentChange.bind(this);
    this.onInterestRateChange = this.onInterestRateChange.bind(this);
    this.onTermMonthsChange = this.onTermMonthsChange.bind(this);
    this.onAdditionalPrincipalChange = this.onAdditionalPrincipalChange.bind(this);
    this.onAssociationDuesChange = this.onAssociationDuesChange.bind(this);
    this.onTaxRateChange = this.onTaxRateChange.bind(this);
    this.onInsuranceRateChange = this.onInsuranceRateChange.bind(this);
    this.onMortgageInsuranceRateChange = this.onMortgageInsuranceRateChange.bind(this);
    this.onMortgageInsuranceEnabledChange = this.onMortgageInsuranceEnabledChange.bind(this);
    this.onLoanTypeChange = this.onLoanTypeChange.bind(this);
  }

  onMortgageChange(mortgage) {

  }

  onLoanTypeChange(e) {
    let value = e.target.value
    this.setState({
      loanType: value,
    });
    this.mortgageCalculator.loanType = value;
    let mortgage = this.mortgageCalculator.calculatePayment();
    this.setState({
      mortgage: mortgage,
    });
    this.onMortgageChange(mortgage);
  }

  onPriceChange(e) {
    let value = e.target.value;
    if (value.length === 0) {
      this.setState({
        totalPrice: value
      });
      return
    }
    value = Util.moneyToValue(value);
    if (isNaN(value)) return;
    this.mortgageCalculator.totalPrice = value;
    let downPaymentPercent = (this.state.totalPrice > 0) ? this.state.downPayment / this.state.totalPrice : DefaultDownPaymentPercent;
    let downPayment = downPaymentPercent * value;
    this.mortgageCalculator.downPayment = downPayment;
    let mortgage = this.mortgageCalculator.calculatePayment();
    this.setState({
      totalPrice: value,
      downPayment: downPayment,
      mortgage: mortgage
    });
    this.onMortgageChange(mortgage);
  }

  onDownPaymentChange(e) {
    let value = e.target.value;
    if (value.length === 0) {
      this.setState({
        downPayment: value
      });
      return
    }
    value = Util.moneyToValue(value);
    if (isNaN(value)) return;
    this.mortgageCalculator.downPayment = value;
    let mortgage = this.mortgageCalculator.calculatePayment();
    this.setState({
      downPayment: value,
      mortgage: mortgage
    });
    this.onMortgageChange(mortgage);
  }

  onDownPaymentPercentChange(e) {
    let value = e.target.value;
    if (value.length === 0) {
      this.setState({
        downPayment: value
      });
      return
    }
    if (isNaN(value)) return;
    let downPayment = Math.round((value / 100) * this.state.totalPrice);
    this.mortgageCalculator.downPayment = downPayment;
    let mortgage = this.mortgageCalculator.calculatePayment();
    this.setState({
      downPayment: downPayment,
      mortgage: mortgage
    });
    this.onMortgageChange(mortgage);
  }

  onInterestRateChange(e) {
    let value = Util.percentToValue(e.target.value);
    if (isNaN(value)) return;
    this.mortgageCalculator.interestRate = value;
    let mortgage = this.mortgageCalculator.calculatePayment();
    this.setState({
      mortgage: mortgage
    });
    this.onMortgageChange(mortgage);
  }

  onTermMonthsChange(e) {
    let value = e.target.value;
    if (isNaN(value)) return;
    this.mortgageCalculator.months = value;
    let mortgage = this.mortgageCalculator.calculatePayment();
    this.setState({
      mortgage: mortgage
    });
    this.onMortgageChange(mortgage);
  }

  onAdditionalPrincipalChange(e) {
    let value = Util.moneyToValue(e.target.value);
    this.mortgageCalculator.additionalPrincipalPayment = !isNaN(value) ? value : 0;
    let mortgage = this.mortgageCalculator.calculatePayment();
    this.setState({
      additionalPrincipal: value,
      mortgage: mortgage
    });
    this.onMortgageChange(mortgage);
  }

  onAssociationDuesChange(e) {
    let value = Util.moneyToValue(e.target.value);
    this.mortgageCalculator.associationDues = !isNaN(value) ? value : 0;
    let mortgage = this.mortgageCalculator.calculatePayment();
    this.setState({
      associationDues: value,
      mortgage: mortgage
    });
    this.onMortgageChange(mortgage);
  }

  onTaxRateChange(e) {
    let value = Util.percentToValue(e.target.value);
    if (isNaN(value)) return;
    this.mortgageCalculator.taxRate = value;
    let mortgage = this.mortgageCalculator.calculatePayment();
    this.setState({
      mortgage: mortgage
    });
    this.onMortgageChange(mortgage);
  }

  onInsuranceRateChange(e) {
    let value = Util.percentToValue(100 * (e.target.value / this.mortgageCalculator.totalPrice))
    if (isNaN(value)) return;
    this.mortgageCalculator.insuranceRate = value;
    let mortgage = this.mortgageCalculator.calculatePayment();
    this.setState({
      mortgage: mortgage
    });
    this.onMortgageChange(mortgage);
  }

  onMortgageInsuranceRateChange(e) {
    let value = Util.percentToValue(e.target.value);
    if (isNaN(value)) return;
    this.mortgageCalculator.mortgageInsuranceRate = value;
    let mortgage = this.mortgageCalculator.calculatePayment();
    this.setState({
      mortgage: mortgage,
    });
    this.onMortgageChange(mortgage);
  }

  onMortgageInsuranceEnabledChange(e) {
    this.mortgageCalculator.mortgageInsuranceEnabled = e;
    let mortgage = this.mortgageCalculator.calculatePayment();
    this.setState({
      mortgageInsuranceEnabled: this.mortgageCalculator.mortgageInsuranceEnabled,
      mortgage: mortgage
    });
    this.onMortgageChange(mortgage);
  }

  render() {

    const { totalPrice, downPayment, additionalPrincipal, associationDues } = this.state;
    const { loanAmount, principalAndInterest, tax, insurance, mortgageInsurance, total } = this.state.mortgage;
    const { interestRate, taxRate, insuranceRate, mortgageInsuranceRate, mortgageInsuranceEnabled, months, loanType } = this.mortgageCalculator;

    let paymentCount = this.state.mortgage.paymentSchedule.length;

    const notes = []
    
    for (var note in this.mortgageCalculator.loanNotes) {
      notes.push(this.mortgageCalculator.loanNotes[note])
    }


    let years = Math.floor(paymentCount / 12);
    let remainingMonths = paymentCount % 12;
    let yearsLabel = years === 1 ? 'year' : 'years';
    let monthsLabel = remainingMonths === 1 ? 'month' : 'months';
    let separatorLabel = years > 0 && remainingMonths > 0 ? ' and ' : '';
    let payoffMessage = '';
    if (years > 0) payoffMessage += `${years} ${yearsLabel}`;
    payoffMessage += separatorLabel;
    if (remainingMonths > 0) payoffMessage += `${remainingMonths} ${monthsLabel}`;
    if (payoffMessage.length > 0) payoffMessage = `Fully paid in ${payoffMessage}`;

    const downPaymentPercent = downPayment.length === 0 ? '' : (totalPrice > 0 && downPayment > 0) ? downPayment / totalPrice : DefaultDownPaymentPercent;

    return (

      <div>

        <h1>Mortgage Calculator</h1>
        <div className="flex flex-col md:flex-row space-x-4 ">
          <div className="">
            <div name='calculatorInput' className="flex flex-col w-full space-y-2">

              <div className="flex flex-col md:flex-row justify-end">
                <label className="whitespace-nowrap md:self-center mx-2">Loan Type</label>
                <select className="border border-black rounded-md px-4 w-48" name="termMonths" onInput={this.onLoanTypeChange} defaultValue={months}>
                  <option value="conventional">Conventional</option>
                  <option value="fha">FHA</option>
                  <option value="va">VA</option>
                  <option value="jumbo">Jumbo</option>
                </select>
              </div>
              <div class="flex flex-col md:flex-row justify-end">
                <label className="whitespace-nowrap md:self-center  mx-2">Purchase Price</label>
                <div>
                  <i class='absolute my-2 mx-2'>$</i>
                  <input
                    value={Util.moneyValue(totalPrice, false, false)} onChange={this.onPriceChange}
                    class="border border-black rounded-md px-4 w-48"
                  />
                </div>
              </div>
              <div class="flex flex-col md:flex-row justify-end ">
                <label className="whitespace-nowrap md:self-center mx-2">Down Payment</label>
                <div className='flex flex-row space-x-2'>
                  <div>
                    <i class='absolute my-2 mx-2'>$</i>
                    <input
                      value={Util.moneyValue(downPayment, false, false)} onChange={this.onDownPaymentChange}
                      class=" border border-black rounded-md px-4 w-32"
                    />
                  </div>
                  <p className="my-2">Or</p>
                  <div>
                    <i class='absolute my-2 mx-2'>%</i>
                    <input
                      value={Util.percentValue(downPaymentPercent, false)} onChange={this.onDownPaymentPercentChange}
                      class="w-32 border border-black rounded-md px-4"
                      type="number"
                    />
                  </div>
                </div>

              </div>
              <div class="flex flex-col md:flex-row justify-end">
                <label className="whitespace-nowrap md:self-center mx-2">Interest Rate</label>
                <div >
                  <i class='absolute my-2 mx-2'>%</i>
                  <input
                    defaultValue={Util.percentValue(interestRate, false)} step="0.01" onInput={this.onInterestRateChange}
                    class="border border-black rounded-md px-4 w-48"
                    type="number"
                    name="interestRate"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-end">
                <label className="whitespace-nowrap md:self-center mx-2">Term</label>
                <select className="border border-black rounded-md px-4 w-48" name="termMonths" onInput={this.onTermMonthsChange} defaultValue={months}>
                  <option value="360">30 years</option>
                  <option value="240">20 years</option>
                  <option value="180">15 years</option>
                  <option value="120">10 years</option>
                  <option value="60">5 years</option>
                </select>
              </div>
              <div class="flex flex-col md:flex-row justify-end">
                <label className="whitespace-nowrap md:self-center mx-2">Additional Payment (Monthly)</label>
                <div>
                  <i class='absolute my-2 mx-2'>$</i>
                  <input
                    value={Util.moneyValue(additionalPrincipal, false, false)} onInput={this.onAdditionalPrincipalChange}
                    class=" border border-black rounded-md px-4 w-48"
                    type="text"
                    name="additionalPrincipalPayment"
                  />
                </div>
              </div>
              <div class="flex flex-col md:flex-row justify-end">
                <label className="whitespace-nowrap md:self-center mx-2">Property Tax Rate (Annual)</label>
                <div>
                  <i class='absolute my-2 mx-2'>%</i>
                  <input
                    defaultValue={Util.percentValue(taxRate, false)} step="0.01" onInput={this.onTaxRateChange}
                    class=" border border-black rounded-md px-4 w-48"
                    type="number"
                    name="taxRate"
                  />
                </div>
              </div>
              <div class="flex flex-col md:flex-row justify-end">
                <label className="whitespace-nowrap md:self-center mx-2 ">Hazard Insurance (Annual)</label>
                <div>
                  <i class='absolute my-2 mx-2'>$</i>
                  <input
                    defaultValue={Util.percentValue(insuranceRate, false) * totalPrice / 100} onInput={this.onInsuranceRateChange}
                    class=" border border-black rounded-md px-4 w-48"
                    type="number"
                    name="insuranceRate"
                  />
                </div>
              </div>
              <div class="flex flex-col md:flex-row justify-end">
                <label className="whitespace-nowrap md:self-center mx-2">Association Dues (Monthly)</label>
                <div>
                  <i class='absolute my-2 mx-2'>$</i>
                  <input
                    defaultValue={Util.moneyValue(associationDues, false, false)} onInput={this.onAssociationDuesChange}
                    class=" border border-black rounded-md px-4 w-48"
                    type="number"
                    name="associationDues"
                  />
                </div>
              </div>
              <div class="flex flex-col md:flex-row justify-end">
                <label className="whitespace-nowrap md:self-center mx-2">Mortgage Insurance</label>
                <div className='flex flex-row space-x-2'>
                  <div>
                    <i class='absolute my-2 mx-2'>%</i>
                    <input
                      value ={Util.percentValue(mortgageInsuranceRate, false)} onChange={this.onMortgageInsuranceRateChange}
                      class=" border border-black rounded-md px-4 w-48"
                      name="mortgageInsuranceRate"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-x-4 border boder-solid">
            <div class="flex flex-col">
              <div class="overflow-x-auto">
                <div class="py-2 inline-block ">
                  <div class="overflow-hidden">
                    <table class="min-w-full border-2 rounded-md border-solid">
                      <thead class="border-b">
                        <tr>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Monthly
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> Principal and Interest</td>
                          <td>
                            {Util.moneyValue(principalAndInterest)}
                          </td>
                        </tr>
                        <tr>
                          <td>Property Taxes</td>
                          <td>
                            {Util.moneyValue(this.state.mortgage.tax)}
                          </td>
                        </tr>
                        <tr>
                          <td>Home Owners Insurance</td>
                          <td>
                            {Util.moneyValue(this.state.mortgage.insurance)}
                          </td>
                        </tr>
                        {/* you'll only have MI in these two situaitons. so onlyshow then  */} 
                        {(loanType == 'conventional' & downPaymentPercent < .20) || (loanType == 'fha') ?
                          <tr class="bg-white border-b">
                            <td class="whitespace-nowrap text-sm text-gray-900">Mortgage Insurance</td>
                            <td class="text-md text-gray-900 whitespace-nowrap">
                              {Util.moneyValue(mortgageInsurance)}
                            </td>
                          </tr> : ''}
                        {associationDues != 0 ?
                          <tr class="bg-white border-b">
                            <td class="whitespace-nowrap text-sm text-gray-900">Association Dues</td>
                            <td class="text-md text-gray-900 whitespace-nowrap">
                              {Util.moneyValue(associationDues)}
                            </td>
                          </tr> : ''}                       <tr class=" border-b">
                          <td class="bg-sky-100 whitespace-nowrap text-sm font-bold text-gray-900">Total</td>
                          <td class=" bg-sky-100 text-md font-bold text-gray-900 whitespace-nowrap">
                            {Util.moneyValue(total + associationDues)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id='test' className='border-2 border-solid h-fit rounded-md md:w-1/3 inline-block text-sm px-4 py-4'>
            <h2>Notes</h2>
            {notes.map(item => {

              if (item != '') {
                return <p><b className='text-md'>*</b> {item}</p> 
              };

            }
            )
            }
          </div>
        </div>
      </div>
    );
  }
}
