

function statement(invoice,plays){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD',
        minimumFractionDigits:2
    }).format;


    for(let perf of invoice.performances){
        const play = plays[perf.playID];

        let thisAmount =  amountedFor(play,perf)

        volumeCredits += Math.max(0,perf.audience - 30);

        if(play.type === 'comedy') volumeCredits += Math.floor(perf.audience / 5)
        result += `${play.name}: ${format(thisAmount/100) } ${perf.audience}  seats\n`
        totalAmount += thisAmount;
    }

    result += 'amount owned is ' + format(totalAmount/100) + '\n';
    result += `you earn ${volumeCredits} credits \n`;

    return result;
}

const getPlay = (aPerformance)=>{
    return
}
const amountedFor = (play,aPerformance)=>{
    let result;
    switch(play.type){
        case 'tragedy':
            result = 4000;
            if(aPerformance.audience > 30){
                result += 1000 * (aPerformance.audience - 30)
            }
            break;
            case 'comedy':
                result = 3000;
                if(aPerformance.audience > 20){
                    result += 10000 + 500 * (aPerformance.audience - 30)
                }
            break;
        default:
            throw new Error('unknown type:'+ play.type)
    }
    return result
}

export default statement



