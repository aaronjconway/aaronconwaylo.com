const defaultPrice = 500000;
const defaultDownPayment = 100000;
const defaultInterestRate = 0.05;
const defaultMonths = 360;
const defaultTaxRate = 0.0126;
const defaultInsuranceRate = 0.0014;
const defaultMortgageInsuranceRate = 0.003;
const defaultMortgageInsuranceEnabled = true;
const defaultMortgageInsuranceThreshold = 0.2;
const defaultAdditionalPrincipalPayment = 0;
const defaultLoanType = 'conventional';

class MortgageCalculator {

    constructor() {
        this.totalPrice = defaultPrice;
        this.downPayment = defaultDownPayment;
        this.interestRate = defaultInterestRate;
        this.months = defaultMonths;
        this.taxRate = defaultTaxRate;
        this.insuranceRate = defaultInsuranceRate;
        this.mortgageInsuranceRate = defaultMortgageInsuranceRate;
        this.mortgageInsuranceEnabled = defaultMortgageInsuranceEnabled;
        this.mortgageInsuranceThreshold = defaultMortgageInsuranceThreshold;
        this.additionalPrincipalPayment = defaultAdditionalPrincipalPayment;
        this.loanType = defaultLoanType;
        this.loanNotes = {
            'downPayment': '',
            'mortgageInsurance': ''
        };

    }

    calculatePayment() {
        let loanAmount = this.totalPrice - this.downPayment;
        let paymentSchedule = MortgageCalculator.calculatePaymentSchedule(loanAmount, this.interestRate, this.months, this.additionalPrincipalPayment);
        let piPayment = paymentSchedule.length ? paymentSchedule[0].totalPayment : 0;
        let downPaymentPercentage = this.downPayment / this.totalPrice;
        let mortgageInsurance = 0;

        if (this.loanType == 'conventional' && downPaymentPercentage > .20) {
            this.mortgageInsuranceRate = 0;
            this.loanNotes.mortgageInsurance = 'Mortgage insurance is disabled becuase the down payment is greater than 20% and loan type = conventional'
        }

        if (this.mortgageInsuranceEnabled && this.loanType == 'conventional' && downPaymentPercentage < this.mortgageInsuranceThreshold) {
            this.mortgageInsuranceRate = defaultMortgageInsuranceRate;
            this.loanNotes.mortgageInsurance = 'Mortgage insurance is enabled becuase the down payment is less than 20% and loan type = conventional';
            mortgageInsurance = (loanAmount * this.mortgageInsuranceRate) / 12;
        }

        if (this.loanType == 'conventional' && downPaymentPercentage < .05) {
            this.loanNotes.downPayment = 'You must be a first time home buyer or have a form of DPA to do less than 5% down.'
        } else if (this.loanType == 'conventional' && downPaymentPercentage >= .05 ){

            this.loanNotes.downPayment = ''
        }

        if (this.loanType == 'fha') {
            this.loanNotes.mortgageInsurance = 'Mortgage insurance is required on all FHA loans.'
            if (downPaymentPercentage < .035) {
                this.loanNotes.downPayment = 'Be aware the minimum down payment on an FHA loan is 3.5% unless you have Down Payment assistance.'
            }
            // https://www.hud.gov/sites/documents/15-01MLATCH.PDF
            // if  over 15 years.
            if (this.months > 180) {

                //and ltv < 95
                if (downPaymentPercentage >= .05) {
                    this.loanNotes.mortgageInsurance = 'Mortgage insurance is required on all FHA loans. The annual mi rate with > 5% down and > 15 year term is 0.8%'
                    this.mortgageInsuranceRate = .0080;
                    mortgageInsurance = (loanAmount * this.mortgageInsuranceRate) / 12;
                }
                if (downPaymentPercentage < .05) {

                    this.loanNotes.mortgageInsurance = 'Mortgage insurance is required on all FHA loans. The annual mi rate with < 5% down and > 15 year term is 0.85%'

                    this.mortgageInsuranceRate = .0085;
                    mortgageInsurance = (loanAmount * this.mortgageInsuranceRate) / 12;
                }
            }
            if (this.months <= 180) { 
                if (downPaymentPercentage >= .10) {

                    this.loanNotes.mortgageInsurance = 'Mortgage insurance is required on all FHA loans. The annual mi rate with >= 10% down and 15 year term or less is 0.45%'
                    mortgageInsurance = (loanAmount * .0045) / 12;
                }

                if (downPaymentPercentage < .10) {

                    this.loanNotes.mortgageInsurance = 'Mortgage insurance is required on all FHA loans. The annual mi rate with < 10% down and 15 year term or less is 0.45%'
                    mortgageInsurance = (loanAmount * .0070) / 12;
                }
            }

        }

        let propertyTax = (this.totalPrice * this.taxRate) / 12;
        let homeOwnerInsurance = MortgageCalculator.roundPenny((this.totalPrice * this.insuranceRate) / 12);
        return {
            loanAmount: loanAmount,
            principalAndInterest: piPayment,
            tax: propertyTax,
            insurance: homeOwnerInsurance,
            total: piPayment + propertyTax + homeOwnerInsurance + mortgageInsurance,
            termMonths: this.months,
            paymentSchedule: paymentSchedule,
            mortgageInsurance: mortgageInsurance
        };
    }

    static calculatePaymentSchedule(loanAmount, annualRate, termMonths, additionalPrincipalPayments = 0) {
        const monthlyRate = annualRate / 12;
        const monthlyPayment = MortgageCalculator.calculateMonthlyPIPayment(loanAmount, annualRate, termMonths);
        let principal = MortgageCalculator.roundPenny(loanAmount);
        let payments = [];
        let totalInterest = 0;
        let totalPayments = 0;
        let i = 0;
        while (principal > 0 && i < termMonths) {
            let interestPayment = MortgageCalculator.roundPenny(principal * monthlyRate);
            let principalPayment = MortgageCalculator.roundPenny(monthlyPayment - interestPayment + additionalPrincipalPayments);
            if (principal > principalPayment) {
                principal = MortgageCalculator.roundPenny(principal - principalPayment);
            }
            else {
                principalPayment = principal;
                principal = 0;
            }
            let totalPayment = interestPayment + principalPayment;
            totalInterest += interestPayment;
            totalPayments += totalPayment;
            payments[i] = {
                count: i + 1,
                interestPayment: interestPayment,
                totalInterest: totalInterest,
                principalPayment: principalPayment,
                totalPayment: totalPayment,
                totalPayments: totalPayments,
                balance: principal
            };
            i++;
        }

        return payments;
    }

    static calculateMonthlyPIPayment(loanAmount, annualRate, termMonths) {
        let monthlyRate = annualRate / 12;
        let payment = (monthlyRate * loanAmount * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
        return this.nextPenny(payment);
    }

    static roundPenny(value) {
        return Math.round(value * 100) / 100;
    }

    static nextPenny(value) {
        return Math.ceil(value * 100) / 100;
    }
}

const _calc = new MortgageCalculator();

module.exports = {
    createMortgageCalculator: function() {
        return new MortgageCalculator();
    },
    calculatePayment: function(totalPrice = defaultPrice,
        downPayment = defaultDownPayment,
        interestRate = defaultInterestRate,
        months = defaultMonths,
        taxRate = defaultTaxRate,
        insuranceRate = defaultInsuranceRate,
        mortgageInsuranceRate = defaultMortgageInsuranceRate,
        mortgageInsuranceEnabled = defaultMortgageInsuranceEnabled,
        mortgageInsuranceThreshold = defaultMortgageInsuranceThreshold,
        additionalPrincipalPayment = defaultAdditionalPrincipalPayment) {
        _calc.totalPrice = totalPrice;
        _calc.downPayment = downPayment;
        _calc.interestRate = interestRate;
        _calc.months = months;
        _calc.taxRate = taxRate;
        _calc.insuranceRate = insuranceRate;
        _calc.mortgageInsuranceRate = mortgageInsuranceRate;
        _calc.mortgageInsuranceEnabled = mortgageInsuranceEnabled;
        _calc.mortgageInsuranceThreshold = mortgageInsuranceThreshold;
        _calc.additionalPrincipalPayment = additionalPrincipalPayment;
        return _calc.calculatePayment();
    },
    nextPenny: MortgageCalculator.nextPenny
};

