# Level One Proposal Generation System - Documentation

## Overview

This system consists of two parts:
1. **Proposal Generator Form** - A multi-page form that collects proposal information
2. **Proposal Display** - The final proposal that clients view and sign

The form sends data to Make.com, where AI processes the information and generates a fully-formatted proposal URL that you can email to clients.

---

## Files Included

1. `proposal-generator.html` - The form interface
2. `generator-styles.css` - Form styling
3. `generator-script.js` - Form logic and webhook integration

---

## Setup Instructions

### Step 1: Deploy the Generator Form

1. Upload all three generator files to your web server or GitHub Pages
2. Access the form at your deployed URL (e.g., `https://yourdomain.com/proposal-generator.html`)

### Step 2: Create Make.com Scenario

Create a new scenario in Make.com with the following modules:

#### Module 1: Webhooks - Custom Webhook
- Create a new webhook to receive form data
- Copy the webhook URL (you'll need this in the form)

#### Module 2: OpenAI (or Claude) - Create a Completion
- Use the AI prompt provided below
- Output should be in JSON format

#### Module 3: Parse JSON
- Parse the AI response to extract individual fields

#### Module 4: Text Aggregator (Optional)
- Build the final URL with encoded parameters

#### Module 5: Email or Store URL
- Send the generated URL via email or save to database

---

## AI Prompt for Make.com

Use this prompt in your AI module (OpenAI GPT-4 or Claude Sonnet):

```
You are a professional proposal writer for Level One, an AI automation company. You will receive form data about a client project and must generate compelling, professional content for each section of the proposal.

INPUT DATA:
{{webhook output}}

YOUR TASK:
Generate polished, professional content for the following fields. Expand on the context provided while maintaining a professional, consultative tone.

CRITICAL FORMATTING REQUIREMENTS:
1. For detailProblem1Desc through detailProblem4Desc: Write 2-3 sentences explaining the problem in detail, focusing on impact and urgency.
2. For solution0Desc through solution5Desc: Write 2-3 sentences explaining the solution, focusing on benefits and implementation.
3. For milestone1Desc through milestone6Desc: Write 1-2 sentences describing what happens in that phase.
4. For milestone tasks: Generate 4-5 specific, actionable tasks for each milestone. Separate them with the pipe character |
5. For depositIncludes: Generate 5 bullet points based on the context provided. Separate with |
6. For remainingIncludes: Generate 4 bullet points based on the context provided. Separate with |
7. For system descriptions (if needed): Write 1-2 sentences about each system capability.

OUTPUT FORMAT:
Respond with ONLY a valid JSON object (no markdown, no explanation) with these exact keys:

{
  "detailProblem1Desc": "...",
  "detailProblem2Desc": "...",
  "detailProblem3Desc": "...",
  "detailProblem4Desc": "...",
  "solution0Desc": "...",
  "solution1Desc": "...",
  "solution2Desc": "...",
  "solution3Desc": "...",
  "solution4Desc": "...",
  "solution5Desc": "...",
  "milestone1Desc": "...",
  "milestone1Tasks": "Task 1|Task 2|Task 3|Task 4|Task 5",
  "milestone2Desc": "...",
  "milestone2Tasks": "Task 1|Task 2|Task 3|Task 4|Task 5",
  "milestone3Desc": "...",
  "milestone3Tasks": "Task 1|Task 2|Task 3|Task 4",
  "milestone4Desc": "...",
  "milestone4Tasks": "Task 1|Task 2|Task 3|Task 4",
  "milestone5Desc": "...",
  "milestone5Tasks": "Task 1|Task 2|Task 3",
  "milestone6Desc": "...",
  "milestone6Tasks": "Task 1|Task 2|Task 3|Task 4",
  "depositInclude1": "...",
  "depositInclude2": "...",
  "depositInclude3": "...",
  "depositInclude4": "...",
  "depositInclude5": "...",
  "remainingInclude1": "...",
  "remainingInclude2": "...",
  "remainingInclude3": "...",
  "remainingInclude4": "...",
  "paymentStructure": "Professional explanation of payment terms (1-2 sentences)",
  "milestoneSignoff": "Professional explanation of approval process (1-2 sentences)",
  "system1Desc": "Lead sourcing description (if needed)",
  "system2Desc": "Client onboarding description (if needed)",
  "system3Desc": "Data entry description (if needed)",
  "system4Desc": "Contract creation description (if needed)",
  "system5Desc": "Customer support description (if needed)",
  "system6Desc": "Reporting & analytics description (if needed)"
}

IMPORTANT RULES:
- Be specific and actionable
- Use professional language
- Focus on business value and ROI
- Keep descriptions concise but compelling
- Ensure tasks are sequential and logical
- Use the pipe character | ONLY for separating list items (tasks and includes)
```

---

## Building the Final URL in Make.com

After the AI generates the content, you need to build the final proposal URL with all parameters encoded.

### Option 1: Manual URL Building (Recommended for Email)

Use Make.com's built-in functions to build the URL. Here's the structure:

```
https://level-one-ai.github.io/Proposal-System/?proposalTitlePrefix={{encodeURL(webhook.proposalTitlePrefix)}}&companyName={{encodeURL(webhook.companyName)}}&proposalSubtitle={{encodeURL(webhook.proposalSubtitle)}}&clientName={{encodeURL(webhook.clientName)}}&problem1={{encodeURL(webhook.problem1)}}&problem2={{encodeURL(webhook.problem2)}}&problem3={{encodeURL(webhook.problem3)}}&problem4={{encodeURL(webhook.problem4)}}&detailProblem1Title={{encodeURL(webhook.detailProblem1Title)}}&detailProblem1Desc={{encodeURL(aiResponse.detailProblem1Desc)}}&detailProblem2Title={{encodeURL(webhook.detailProblem2Title)}}&detailProblem2Desc={{encodeURL(aiResponse.detailProblem2Desc)}}&detailProblem3Title={{encodeURL(webhook.detailProblem3Title)}}&detailProblem3Desc={{encodeURL(aiResponse.detailProblem3Desc)}}&detailProblem4Title={{encodeURL(webhook.detailProblem4Title)}}&detailProblem4Desc={{encodeURL(aiResponse.detailProblem4Desc)}}&solution0Title={{encodeURL(webhook.solution0Title)}}&solution0Desc={{encodeURL(aiResponse.solution0Desc)}}&solution1Title={{encodeURL(webhook.solution1Title)}}&solution1Desc={{encodeURL(aiResponse.solution1Desc)}}&solution2Title={{encodeURL(webhook.solution2Title)}}&solution2Desc={{encodeURL(aiResponse.solution2Desc)}}&solution3Title={{encodeURL(webhook.solution3Title)}}&solution3Desc={{encodeURL(aiResponse.solution3Desc)}}&solution4Title={{encodeURL(webhook.solution4Title)}}&solution4Desc={{encodeURL(aiResponse.solution4Desc)}}&solution5Title={{encodeURL(webhook.solution5Title)}}&solution5Desc={{encodeURL(aiResponse.solution5Desc)}}&milestone1Title={{encodeURL(webhook.milestone1Title)}}&milestone1Date={{encodeURL(webhook.milestone1Date)}}&milestone1Desc={{encodeURL(aiResponse.milestone1Desc)}}&milestone1Tasks={{encodeURL(aiResponse.milestone1Tasks)}}&milestone2Title={{encodeURL(webhook.milestone2Title)}}&milestone2Date={{encodeURL(webhook.milestone2Date)}}&milestone2Desc={{encodeURL(aiResponse.milestone2Desc)}}&milestone2Tasks={{encodeURL(aiResponse.milestone2Tasks)}}&milestone3Title={{encodeURL(webhook.milestone3Title)}}&milestone3Date={{encodeURL(webhook.milestone3Date)}}&milestone3Desc={{encodeURL(aiResponse.milestone3Desc)}}&milestone3Tasks={{encodeURL(aiResponse.milestone3Tasks)}}&milestone4Title={{encodeURL(webhook.milestone4Title)}}&milestone4Date={{encodeURL(webhook.milestone4Date)}}&milestone4Desc={{encodeURL(aiResponse.milestone4Desc)}}&milestone4Tasks={{encodeURL(aiResponse.milestone4Tasks)}}&milestone5Title={{encodeURL(webhook.milestone5Title)}}&milestone5Date={{encodeURL(webhook.milestone5Date)}}&milestone5Desc={{encodeURL(aiResponse.milestone5Desc)}}&milestone5Tasks={{encodeURL(aiResponse.milestone5Tasks)}}&milestone6Title={{encodeURL(webhook.milestone6Title)}}&milestone6Date={{encodeURL(webhook.milestone6Date)}}&milestone6Desc={{encodeURL(aiResponse.milestone6Desc)}}&milestone6Tasks={{encodeURL(aiResponse.milestone6Tasks)}}&system1Desc={{encodeURL(aiResponse.system1Desc)}}&system2Desc={{encodeURL(aiResponse.system2Desc)}}&system3Desc={{encodeURL(aiResponse.system3Desc)}}&system4Desc={{encodeURL(aiResponse.system4Desc)}}&system5Desc={{encodeURL(aiResponse.system5Desc)}}&system6Desc={{encodeURL(aiResponse.system6Desc)}}&depositTitle={{encodeURL("Deposit — Project Initiation")}}&depositPercentage={{encodeURL(webhook.depositPercentage)}}&depositDesc={{encodeURL("Due upon agreement signing to commence work")}}&depositCoversTitle={{encodeURL(webhook.depositCoversTitle)}}&depositInclude1={{encodeURL(aiResponse.depositInclude1)}}&depositInclude2={{encodeURL(aiResponse.depositInclude2)}}&depositInclude3={{encodeURL(aiResponse.depositInclude3)}}&depositInclude4={{encodeURL(aiResponse.depositInclude4)}}&depositInclude5={{encodeURL(aiResponse.depositInclude5)}}&depositAmount={{encodeURL(webhook.depositAmount)}}&remainingTitle={{encodeURL("Remaining Balance")}}&remainingPercentage={{encodeURL(webhook.remainingPercentage)}}&remainingDesc={{encodeURL("Paid in installments upon completion of each milestone")}}&remainingCoversTitle={{encodeURL(webhook.remainingCoversTitle)}}&remainingInclude1={{encodeURL(aiResponse.remainingInclude1)}}&remainingInclude2={{encodeURL(aiResponse.remainingInclude2)}}&remainingInclude3={{encodeURL(aiResponse.remainingInclude3)}}&remainingInclude4={{encodeURL(aiResponse.remainingInclude4)}}&milestone3Payment={{encodeURL(webhook.milestone3Payment)}}&milestone3Amount={{encodeURL(webhook.milestone3Amount)}}&milestone4Payment={{encodeURL(webhook.milestone4Payment)}}&milestone4Amount={{encodeURL(webhook.milestone4Amount)}}&milestone56Payment={{encodeURL(webhook.milestone56Payment)}}&milestone56Amount={{encodeURL(webhook.milestone56Amount)}}&remainingAmount={{encodeURL(webhook.remainingAmount)}}&projectTotal={{encodeURL(webhook.projectTotal)}}&paymentStructure={{encodeURL(aiResponse.paymentStructure)}}&milestoneSignoff={{encodeURL(aiResponse.milestoneSignoff)}}&platform1Name={{encodeURL(webhook.platform1Name)}}&platform1Price={{encodeURL(webhook.platform1Price)}}&platform2Name={{encodeURL(webhook.platform2Name)}}&platform2Price={{encodeURL(webhook.platform2Price)}}
```

### Option 2: Use Make.com's "Set Variable" Module

For easier management, use Set Variable modules to build URL parts, then concatenate them:

1. **Set Variable: Base URL**
   ```
   https://level-one-ai.github.io/Proposal-System/?
   ```

2. **Set Variable: Client Info**
   ```
   proposalTitlePrefix={{encodeURL(webhook.proposalTitlePrefix)}}&companyName={{encodeURL(webhook.companyName)}}&clientName={{encodeURL(webhook.clientName)}}
   ```

3. **Set Variable: Problems**
   ```
   &problem1={{encodeURL(webhook.problem1)}}&problem2={{encodeURL(webhook.problem2)}}...
   ```

4. **Text Aggregator: Combine All Parts**
   - Add all URL parts in sequence

---

## Email Template for Sending Proposals

Once you have the final URL, send it via email:

```
Subject: Your Custom Proposal from Level One

Hi {{clientName}},

Thank you for discussing your project with us. We're excited about the opportunity to work with {{companyName}}.

I've prepared a comprehensive proposal that outlines:
- The challenges we'll solve together
- Our proposed solution and approach
- Detailed project timeline with 6 milestones
- Transparent investment breakdown
- Terms and agreement

View and sign your proposal here:
{{proposalURL}}

The proposal includes interactive features like a timeline visualization and digital signature capabilities. Once you've reviewed it, you can sign directly in the browser.

If you have any questions or would like to discuss any aspect of the proposal, please don't hesitate to reach out.

Looking forward to partnering with you!

Best regards,
Dean
Level One
dean@levelone.ai
```

---

## Testing the System

### Test the Form:
1. Open `proposal-generator.html` in your browser
2. Fill out all required fields
3. Use a Make.com webhook URL (or a test webhook like webhook.site)
4. Submit the form
5. Check that the data arrives correctly

### Test the AI Processing:
1. Use the AI prompt in Make.com
2. Verify the JSON output is properly formatted
3. Check that all fields are populated

### Test the Final URL:
1. Copy the generated URL
2. Paste it in a browser
3. Verify all content displays correctly
4. Test the signature functionality

---

## Troubleshooting

### Common Issues:

**1. Form data not reaching Make.com**
- Check the webhook URL is correct
- Verify CORS settings if hosting on custom domain
- Check Make.com scenario is active

**2. AI generates malformed JSON**
- Ensure the AI prompt is exact
- Check for quote escaping issues
- Verify JSON parsing module in Make.com

**3. URL too long**
- Some email clients have URL length limits
- Consider using a URL shortener service
- Store proposal data in database and use short ID instead

**4. Special characters breaking URL**
- Ensure all values are wrapped in encodeURL()
- Check for unencoded pipe characters
- Verify quotes are escaped properly

**5. Proposal displays incorrectly**
- Check JavaScript console for errors
- Verify all URL parameters are present
- Test with simpler content first

---

## Advanced Features (Future Enhancements)

1. **Database Storage**: Store proposals in database with unique IDs for shorter URLs
2. **PDF Generation**: Auto-generate PDF version after signature
3. **Version Control**: Track proposal revisions and changes
4. **Analytics**: Track when proposals are viewed and signed
5. **Template Management**: Multiple proposal templates for different services
6. **Client Portal**: Dashboard for clients to view all their proposals

---

## Support

For questions or issues:
- Email: dean@levelone.ai
- Documentation: This README
- Make.com Community: https://community.make.com

---

## Version History

**v1.0** - Initial release
- Multi-page form with 7 steps
- Make.com webhook integration
- AI content generation
- Encoded URL output for email delivery
