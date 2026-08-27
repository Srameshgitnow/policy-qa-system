import { query } from '../connection.js';
import { logger } from '../../utils/logger.js';
const seedPolicies = [
    {
        title: 'Child Benefit rates 2024-2025',
        category: 'benefits',
        source: 'gov.uk',
        url: 'https://gov.uk/child-benefit',
        sourceDate: '2024-01-01',
        content: `Child Benefit is a monthly payment to help with the cost of bringing up children.

You can claim Child Benefit for each child until they turn 16 (or 20 if in approved education or training).

Current rates (2024-2025):
- Eldest child: £24.50 per week
- Other children: £16.30 per week each

Example for 2 children:
- Eldest: £24.50/week
- Second child: £16.30/week
- Total: £40.80/week (£2,121.60/year)

High Income Child Benefit Charge:
If your household income exceeds £50,000, you may need to repay some or all of the Child Benefit through self-assessment.`
    },
    {
        title: 'UK Passport Application Requirements',
        category: 'passports',
        source: 'gov.uk',
        url: 'https://gov.uk/apply-for-passport',
        sourceDate: '2024-01-01',
        content: `What you'll need to apply for a UK passport.

Documents required:
1. Proof of identity (one of):
   - Current valid passport
   - Birth certificate (full version with parents' details)
   - UK photocard driving licence
   - National ID card

2. Proof of residence (dated within last 3 months):
   - Utility bill
   - Council tax bill
   - Bank statement
   - Mortgage statement

3. Passport photographs:
   - 6x4cm
   - Recent (taken within last 6 months)
   - In colour
   - Not wearing glasses or sunglasses (unless for medical reasons)
   - Clear face visible

4. Completed application form SP11 (standard adult application)

5. Payment (fees apply, varies by application type)

Processing times typically take 3-6 weeks for standard applications.`
    },
    {
        title: 'Universal Credit - How Much You Can Get',
        category: 'benefits',
        source: 'gov.uk',
        url: 'https://gov.uk/universal-credit',
        sourceDate: '2024-01-01',
        content: `Universal Credit is a monthly payment for people who are out of work, on a low income, or unable to work.

Standard allowance rates (2024-2025):
- Single person under 25: £292.60 per month
- Single person 25 and over: £368.74 per month
- Couple (both 25+): £578.82 per month

Additional amounts may be added if you:
- Have children (child element)
- Have disabilities or health conditions (limited capability for work element)
- Are a carer (carer element)
- Have housing costs (housing element)

You must:
- Be at least 18 (or 16-17 in certain circumstances)
- Be a UK resident
- Have less than £16,000 in capital/savings
- Not be studying full-time

Your payment is reduced if you earn money, but you can earn £435 per month (£180 if you have a partner and one of you gets limited capability work element) before your Universal Credit is affected.`
    },
    {
        title: 'Statutory Maternity Allowance',
        category: 'maternity',
        source: 'gov.uk',
        url: 'https://gov.uk/maternity-allowance',
        sourceDate: '2024-01-01',
        content: `Statutory Maternity Allowance helps women who cannot get Statutory Maternity Pay.

Rate: £184.03 per week for up to 39 weeks (2024-2025)

You qualify if you:
- Are pregnant or have just had a baby
- Have been self-employed or worked for someone else for at least 2 years
- Have earned on average at least £30 per week (over a 13-week assessment period)
- Are not entitled to Statutory Maternity Pay
- Stop work for your pregnancy/birth/miscarriage

You cannot get Maternity Allowance if:
- You're employed but entitled to Statutory Maternity Pay
- You're in prison
- You're not a UK resident

Payment usually starts 2 weeks before your due date and continues for up to 39 weeks.`
    }
];
async function seedDatabase() {
    logger.info('Seeding database with sample policies...');
    for (const policy of seedPolicies) {
        try {
            await query(`INSERT INTO policies (title, category, source, url, source_date, content)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT DO NOTHING`, [policy.title, policy.category, policy.source, policy.url, policy.sourceDate, policy.content]);
            logger.info(`✓ Seeded policy: ${policy.title}`);
        }
        catch (error) {
            logger.error(`✗ Failed to seed policy ${policy.title}:`, error);
        }
    }
    logger.info('Database seeding completed');
}
seedDatabase().catch(error => {
    logger.error('Seeding failed:', error);
    process.exit(1);
});
//# sourceMappingURL=policies.js.map