# Level One Proposal Generation System - Documentation

## Overview

This streamlined system collects high-level client information and lets AI intelligently extract and structure the proposal content. The form has been simplified to 4 pages instead of 7, with AI doing the heavy lifting of organizing problems, solutions, and milestones.

---

## What's Changed

### Old System (7 pages):
- Required manual input of 4 separate problems with titles and context
- Required manual input of 6 separate solutions with titles and context
- Required manual input of 6 milestones with titles, dates, and context
- Required predefined number of tasks per milestone
- Form was tedious and time-consuming

### New System (4 pages):
- **Page 1**: Client information (same as before)
- **Page 2**: Single text block for ALL problems + Single text block for ALL solutions
- **Page 3**: Investment details (simplified)
- **Page 4**: Configuration settings

The AI now:
- Analyzes the problems text and extracts 4 key challenges
- Analyzes the solutions text and extracts 4-6 solution components
- Generates appropriate milestones based on the project scope
- Determines the optimal number of tasks per milestone (not fixed at 3-5)
- Creates all descriptions, bullet points, and payment breakdowns

---

## Files Included

1. `proposal-generator.html` - The streamlined 4-page form
2. `generator-styles.css` - Enhanced styling matching proposal aesthetic
3. `generator-script.js` - Updated form logic

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
- Set max tokens to at least 4000 for comprehensive output
- Temperature: 0.7 for creative but professional content

#### Module 3: Parse JSON
- Parse the AI response to extract individual fields

#### Module 4: Text Aggregator (Optional)
- Build the final URL with encoded parameters

#### Module 5: Email or Store URL
- Send the generated URL via email or save to database

---

## AI Prompt for Make.com

Use this comprehensive prompt in your AI module:

```
You are a professional proposal writer for Level One, an AI automation company. You will analyze the client's problems and proposed solutions to generate a complete, compelling proposal with intelligently structured sections.

INPUT DATA:
{{webhook output}}

ANALYSIS TASK:
From the problemsText, extract and identify 4 distinct key problems the client is facing.
From the solutionsText, extract and identify 4-6 distinct solution components you'll deliver.
Based on both, generate an appropriate project timeline with 4-6 milestones.

CRITICAL FORMATTING REQUIREMENTS:

1. PROBLEMS SECTION (Extract 4 problems):
   - Create problem1, problem2, problem3, problem4 (brief 1-line summaries)
   - Create detailProblem1Title through detailProblem4Title (concise problem names)
   - Create detailProblem1Desc through detailProblem4Desc (2-3 sentences each explaining the problem, impact, and urgency)

2. SOLUTIONS SECTION (Extract 4-6 solutions):
   - Determine how many distinct solutions are described (minimum 4, maximum 6)
   - Create solution0Title through solution5Title (only create what's needed)
   - Create solution0Desc through solution5Desc (2-3 sentences each explaining the solution and benefits)
   - If fewer than 6 solutions, leave the unused ones empty

3. MILESTONES SECTION (Create 4-6 milestones intelligently):
   - Determine the optimal number of milestones based on project scope (4-6)
   - Create milestone1Title through milestone6Title (only create what's needed)
   - Create milestone1Date through milestone6Date (suggest realistic timelines like "Weeks 1-3 • Month Year")
   - Create milestone1Desc through milestone6Desc (1-2 sentences describing the phase)
   - Create milestone1Tasks through milestone6Tasks (separated by |)
   - IMPORTANT: Number of tasks should vary based on milestone complexity:
     * Foundation/setup milestones: 3-5 tasks
     * Implementation milestones: 4-6 tasks
     * Complex integration milestones: 5-8 tasks
     * Launch/handover milestones: 2-4 tasks
   - Tasks should be specific, actionable, and sequential

4. INVESTMENT DETAILS:
   - Create depositInclude1 through depositInclude5 based on depositContext
   - Create remainingInclude1 through remainingInclude4 based on remainingContext
   - Create milestone payment labels and amounts that align with the milestones created
   - Create milestone3Payment, milestone3Amount, milestone4Payment, milestone4Amount, milestone56Payment, milestone56Amount
   - Adjust these based on actual number of milestones created

5. ADDITIONAL CONTENT:
   - paymentStructure: 1-2 professional sentences about payment terms
   - milestoneSignoff: 1-2 professional sentences about approval process
   - system1Desc through system6Desc: If solutions mention specific systems/capabilities, create brief descriptions

OUTPUT FORMAT:
Respond with ONLY a valid JSON object (no markdown, no explanation):

{
  "problem1": "Brief problem summary 1",
  "problem2": "Brief problem summary 2",
  "problem3": "Brief problem summary 3",
  "problem4": "Brief problem summary 4",
  
  "detailProblem1Title": "Problem 1 Name",
  "detailProblem1Desc": "2-3 sentences explaining the problem...",
  "detailProblem2Title": "Problem 2 Name",
  "detailProblem2Desc": "2-3 sentences explaining the problem...",
  "detailProblem3Title": "Problem 3 Name",
  "detailProblem3Desc": "2-3 sentences explaining the problem...",
  "detailProblem4Title": "Problem 4 Name",
  "detailProblem4Desc": "2-3 sentences explaining the problem...",
  
  "solution0Title": "Solution 1 Name",
  "solution0Desc": "2-3 sentences explaining the solution...",
  "solution1Title": "Solution 2 Name",
  "solution1Desc": "2-3 sentences explaining the solution...",
  "solution2Title": "Solution 3 Name",
  "solution2Desc": "2-3 sentences explaining the solution...",
  "solution3Title": "Solution 4 Name",
  "solution3Desc": "2-3 sentences explaining the solution...",
  "solution4Title": "Solution 5 Name (or empty)",
  "solution4Desc": "2-3 sentences explaining the solution (or empty)...",
  "solution5Title": "Solution 6 Name (or empty)",
  "solution5Desc": "2-3 sentences explaining the solution (or empty)...",
  
  "milestone1Title": "Milestone 1 Name",
  "milestone1Date": "Weeks 1-3 • May 2026",
  "milestone1Desc": "1-2 sentences about this phase",
  "milestone1Tasks": "Task 1|Task 2|Task 3|Task 4|Task 5",
  
  "milestone2Title": "Milestone 2 Name",
  "milestone2Date": "Weeks 4-6 • May-June 2026",
  "milestone2Desc": "1-2 sentences about this phase",
  "milestone2Tasks": "Task 1|Task 2|Task 3|Task 4|Task 5|Task 6",
  
  "milestone3Title": "Milestone 3 Name",
  "milestone3Date": "Weeks 7-9 • June 2026",
  "milestone3Desc": "1-2 sentences about this phase",
  "milestone3Tasks": "Task 1|Task 2|Task 3|Task 4",
  
  "milestone4Title": "Milestone 4 Name",
  "milestone4Date": "Weeks 10-12 • June-July 2026",
  "milestone4Desc": "1-2 sentences about this phase",
  "milestone4Tasks": "Task 1|Task 2|Task 3|Task 4|Task 5",
  
  "milestone5Title": "Milestone 5 Name (or empty if not needed)",
  "milestone5Date": "Weeks 13-15 • July 2026 (or empty)",
  "milestone5Desc": "1-2 sentences (or empty)",
  "milestone5Tasks": "Task 1|Task 2|Task 3 (or empty)",
  
  "milestone6Title": "Milestone 6 Name (or empty if not needed)",
  "milestone6Date": "Week 16 • August 2026 (or empty)",
  "milestone6Desc": "1-2 sentences (or empty)",
  "milestone6Tasks": "Task 1|Task 2|Task 3|Task 4 (or empty)",
  
  "depositInclude1": "Bullet point 1",
  "depositInclude2": "Bullet point 2",
  "depositInclude3": "Bullet point 3",
  "depositInclude4": "Bullet point 4",
  "depositInclude5": "Bullet point 5",
  
  "remainingInclude1": "Bullet point 1",
  "remainingInclude2": "Bullet point 2",
  "remainingInclude3": "Bullet point 3",
  "remainingInclude4": "Bullet point 4",
  
  "milestone3Payment": "Milestone 3 — Phase Name",
  "milestone3Amount": "£X,XXX",
  "milestone4Payment": "Milestone 4 — Phase Name",
  "milestone4Amount": "£X,XXX",
  "milestone56Payment": "Milestones 5 & 6 — Phase Name",
  "milestone56Amount": "£X,XXX",
  
  "depositCoversTitle": "This covers Milestones 1 & 2:",
  "remainingCoversTitle": "This covers Milestones 3, 4, 5 & 6:",
  
  "paymentStructure": "Professional explanation of payment terms (1-2 sentences)",
  "milestoneSignoff": "Professional explanation of approval process (1-2 sentences)",
  
  "system1Desc": "System description if needed (or empty)",
  "system2Desc": "System description if needed (or empty)",
  "system3Desc": "System description if needed (or empty)",
  "system4Desc": "System description if needed (or empty)",
  "system5Desc": "System description if needed (or empty)",
  "system6Desc": "System description if needed (or empty)"
}

IMPORTANT RULES:
- Analyze the input text intelligently - don't just split arbitrarily
- Group related problems and solutions logically
- Milestones should follow a natural project progression:
  1. Foundation/Setup
  2. Core Development
  3. Integration & Testing
  4. Advanced Features
  5. Polish & Optimization (if needed)
  6. Launch & Handover (if needed)
- Task counts should reflect milestone complexity (range: 2-8 tasks)
- Use the pipe character | ONLY for separating list items
- Be specific, actionable, and professional
- Focus on business value and ROI
- Ensure logical flow and dependencies between milestones
- Payment milestones should align with actual project milestones created
```

---

## Building the Final URL in Make.com

The URL structure remains similar to the old system, but now pulls from AI-generated fields:

```
https://level-one-ai.github.io/Proposal-System/?proposalTitlePrefix={{encodeURL(webhook.proposalTitlePrefix)}}&companyName={{encodeURL(webhook.companyName)}}&proposalSubtitle={{encodeURL(webhook.proposalSubtitle)}}&clientName={{encodeURL(webhook.clientName)}}&problem1={{encodeURL(aiResponse.problem1)}}&problem2={{encodeURL(aiResponse.problem2)}}&problem3={{encodeURL(aiResponse.problem3)}}&problem4={{encodeURL(aiResponse.problem4)}}&detailProblem1Title={{encodeURL(aiResponse.detailProblem1Title)}}&detailProblem1Desc={{encodeURL(aiResponse.detailProblem1Desc)}}&detailProblem2Title={{encodeURL(aiResponse.detailProblem2Title)}}&detailProblem2Desc={{encodeURL(aiResponse.detailProblem2Desc)}}&detailProblem3Title={{encodeURL(aiResponse.detailProblem3Title)}}&detailProblem3Desc={{encodeURL(aiResponse.detailProblem3Desc)}}&detailProblem4Title={{encodeURL(aiResponse.detailProblem4Title)}}&detailProblem4Desc={{encodeURL(aiResponse.detailProblem4Desc)}}&solution0Title={{encodeURL(aiResponse.solution0Title)}}&solution0Desc={{encodeURL(aiResponse.solution0Desc)}}&solution1Title={{encodeURL(aiResponse.solution1Title)}}&solution1Desc={{encodeURL(aiResponse.solution1Desc)}}&solution2Title={{encodeURL(aiResponse.solution2Title)}}&solution2Desc={{encodeURL(aiResponse.solution2Desc)}}&solution3Title={{encodeURL(aiResponse.solution3Title)}}&solution3Desc={{encodeURL(aiResponse.solution3Desc)}}&solution4Title={{encodeURL(aiResponse.solution4Title)}}&solution4Desc={{encodeURL(aiResponse.solution4Desc)}}&solution5Title={{encodeURL(aiResponse.solution5Title)}}&solution5Desc={{encodeURL(aiResponse.solution5Desc)}}&milestone1Title={{encodeURL(aiResponse.milestone1Title)}}&milestone1Date={{encodeURL(aiResponse.milestone1Date)}}&milestone1Desc={{encodeURL(aiResponse.milestone1Desc)}}&milestone1Tasks={{encodeURL(aiResponse.milestone1Tasks)}}&milestone2Title={{encodeURL(aiResponse.milestone2Title)}}&milestone2Date={{encodeURL(aiResponse.milestone2Date)}}&milestone2Desc={{encodeURL(aiResponse.milestone2Desc)}}&milestone2Tasks={{encodeURL(aiResponse.milestone2Tasks)}}&milestone3Title={{encodeURL(aiResponse.milestone3Title)}}&milestone3Date={{encodeURL(aiResponse.milestone3Date)}}&milestone3Desc={{encodeURL(aiResponse.milestone3Desc)}}&milestone3Tasks={{encodeURL(aiResponse.milestone3Tasks)}}&milestone4Title={{encodeURL(aiResponse.milestone4Title)}}&milestone4Date={{encodeURL(aiResponse.milestone4Date)}}&milestone4Desc={{encodeURL(aiResponse.milestone4Desc)}}&milestone4Tasks={{encodeURL(aiResponse.milestone4Tasks)}}&milestone5Title={{encodeURL(aiResponse.milestone5Title)}}&milestone5Date={{encodeURL(aiResponse.milestone5Date)}}&milestone5Desc={{encodeURL(aiResponse.milestone5Desc)}}&milestone5Tasks={{encodeURL(aiResponse.milestone5Tasks)}}&milestone6Title={{encodeURL(aiResponse.milestone6Title)}}&milestone6Date={{encodeURL(aiResponse.milestone6Date)}}&milestone6Desc={{encodeURL(aiResponse.milestone6Desc)}}&milestone6Tasks={{encodeURL(aiResponse.milestone6Tasks)}}&system1Desc={{encodeURL(aiResponse.system1Desc)}}&system2Desc={{encodeURL(aiResponse.system2Desc)}}&system3Desc={{encodeURL(aiResponse.system3Desc)}}&system4Desc={{encodeURL(aiResponse.system4Desc)}}&system5Desc={{encodeURL(aiResponse.system5Desc)}}&system6Desc={{encodeURL(aiResponse.system6Desc)}}&depositTitle={{encodeURL("Deposit — Project Initiation")}}&depositPercentage={{encodeURL(webhook.depositPercentage)}}&depositDesc={{encodeURL("Due upon agreement signing to commence work")}}&depositCoversTitle={{encodeURL(aiResponse.depositCoversTitle)}}&depositInclude1={{encodeURL(aiResponse.depositInclude1)}}&depositInclude2={{encodeURL(aiResponse.depositInclude2)}}&depositInclude3={{encodeURL(aiResponse.depositInclude3)}}&depositInclude4={{encodeURL(aiResponse.depositInclude4)}}&depositInclude5={{encodeURL(aiResponse.depositInclude5)}}&depositAmount={{encodeURL(webhook.depositAmount)}}&remainingTitle={{encodeURL("Remaining Balance")}}&remainingPercentage={{encodeURL(webhook.remainingPercentage)}}&remainingDesc={{encodeURL("Paid in installments upon completion of each milestone")}}&remainingCoversTitle={{encodeURL(aiResponse.remainingCoversTitle)}}&remainingInclude1={{encodeURL(aiResponse.remainingInclude1)}}&remainingInclude2={{encodeURL(aiResponse.remainingInclude2)}}&remainingInclude3={{encodeURL(aiResponse.remainingInclude3)}}&remainingInclude4={{encodeURL(aiResponse.remainingInclude4)}}&milestone3Payment={{encodeURL(aiResponse.milestone3Payment)}}&milestone3Amount={{encodeURL(aiResponse.milestone3Amount)}}&milestone4Payment={{encodeURL(aiResponse.milestone4Payment)}}&milestone4Amount={{encodeURL(aiResponse.milestone4Amount)}}&milestone56Payment={{encodeURL(aiResponse.milestone56Payment)}}&milestone56Amount={{encodeURL(aiResponse.milestone56Amount)}}&remainingAmount={{encodeURL(webhook.remainingAmount)}}&projectTotal={{encodeURL(webhook.projectTotal)}}&paymentStructure={{encodeURL(aiResponse.paymentStructure)}}&milestoneSignoff={{encodeURL(aiResponse.milestoneSignoff)}}&platform1Name={{encodeURL(webhook.platform1Name)}}&platform1Price={{encodeURL(webhook.platform1Price)}}&platform2Name={{encodeURL(webhook.platform2Name)}}&platform2Price={{encodeURL(webhook.platform2Price)}}
```

---

## Example Form Input

### Problems Text:
```
Our e-commerce platform is struggling with manual content creation that takes hours per product listing. We're losing revenue to fraud - last month alone we had £15,000 in chargebacks. Our support team is overwhelmed with 500+ tickets per week, mostly repetitive questions. We're also missing personalization opportunities - we have customer data but can't act on it in real-time to boost conversions.
```

### Solutions Text:
```
We'll build a custom e-commerce platform with headless architecture for flexibility. An AI content engine will auto-generate product descriptions, SEO metadata, and marketing copy. Intelligent fraud prevention using ML will analyze transactions in real-time. A 24/7 AI support agent will handle common questions and escalate complex issues. Predictive personalization will customize the experience based on browsing behavior. Visual search will let customers find products by image, and dynamic pricing will optimize margins.
```

The AI will intelligently extract:
- **4 Problems**: Manual content creation, Fraud vulnerability, Support overload, Missed personalization
- **6 Solutions**: Custom platform, AI content engine, Fraud prevention, AI support, Personalization, Visual search + pricing
- **6 Milestones**: Foundation, Core development, Security & support, Personalization, Advanced features, Launch

---

## Testing the System

### Test the Form:
1. Open `proposal-generator.html`
2. Fill out the 4 pages (much faster than before!)
3. Use detailed, comprehensive text in the problems and solutions fields
4. Submit to your Make.com webhook

### Test the AI Processing:
1. Verify the AI correctly extracts distinct problems and solutions
2. Check that milestones make logical sense for the project
3. Ensure task counts vary appropriately (not always the same number)
4. Confirm payment milestones align with project milestones

### Test the Final URL:
1. Open the generated URL in a browser
2. Verify all content displays correctly
3. Check that the timeline shows the right number of milestones
4. Test the signature functionality

---

## Advantages of New System

1. **Faster Input**: 4 pages instead of 7, single text blocks instead of dozens of separate fields
2. **More Natural**: Write problems and solutions as you'd explain them to a client
3. **Smarter Output**: AI extracts key points and structures them professionally
4. **Flexible Milestones**: AI determines appropriate number and complexity of tasks
5. **Better UX**: Form looks like the proposal with matching design aesthetic
6. **Less Tedious**: No need to manually split content into predefined sections

---

## Troubleshooting

### AI generates wrong number of problems/solutions:
- Make your input text more distinct - clearly separate different problems/solutions
- Use paragraph breaks or bullet points in your input
- Be more explicit about how many distinct items there are

### Milestones don't make sense:
- Provide more context about project phases in your solutions text
- Mention specific technologies, integrations, or deliverables
- Include timeline hints like "initial MVP" or "launch phase"

### Task counts are too uniform:
- The AI should vary task counts based on complexity
- If it doesn't, refine the prompt to emphasize this more
- Check that your solutions text shows varying complexity

---

## Support

For questions or issues:
- Email: dean@levelone.ai
- Documentation: This README

---

## Version History

**v2.0** - Streamlined AI-Powered System
- Reduced from 7 pages to 4 pages
- Single-input for problems and solutions
- AI-driven content extraction and structuring
- Variable milestone task counts based on complexity
- Enhanced visual design matching proposal aesthetic

**v1.0** - Initial release
- 7-page manual input form
- Fixed problem/solution/milestone structure
