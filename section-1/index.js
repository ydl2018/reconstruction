

function statement(invoice, plays) {


    function renderPlainText(data, plays) {

        const USD = (aNumber) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            }).format(aNumber / 100)
        }

        let result = `Statement for ${data.customer}\n`;
        for (let perf of data.performances) {
            result += `${perf.play.name}: ${USD(perf.amount)} ${perf.audience}  seats\n`
        }
        result += 'amount owned is ' + USD(data.totalAmount) + '\n';
        result += `you earn ${data.totalVolumeCredits} credits \n`;
        return result;
    }
    function enrichPerformance(aPerformance) {
        const result = { ...aPerformance }
        result.play = playFor(result);
        result.amount = amountedFor(result)
        result.volumeCredits = volumeCreditsFor(result)
        return result
    }
    const playFor = (aPerformance) => {
        return plays[aPerformance.playID]
    }
    const amountedFor = (aPerformance) => {
        let result;
        switch (aPerformance.play.type) {
            case 'tragedy':
                result = 4000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30)
                }
                break;
            case 'comedy':
                result = 3000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 30)
                }
                break;
            default:
                throw new Error('unknown type:' + aPerformance.play)
        }
        return result
    }
    const volumeCreditsFor = (aPerformance) => {
        let result = 0
        result += Math.max(0, aPerformance.audience - 30);
        if (aPerformance.play.type === 'comedy') result += Math.floor(aPerformance.audience / 5)
        return result
    }
    const totalAmount = (data) => {
        let result = 0;
        for (let perf of data.performances) {
            {
                result += perf.amount;
            }
            return result
        }
    }


    const totalVolumeCredits = (data) => {
        let result = 0;
        for (let perf of data.performances) {
            result += perf.volumeCredits;
        }
        return result
    }
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData)
    statementData.totalVolumeCredits = totalVolumeCredits(statementData)
    return renderPlainText(statementData, plays)
}



export default statement


