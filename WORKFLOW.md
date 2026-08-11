# How to Work Together

## Principles

1. **Wait for Instructions**: Do NOT implement features or make changes unless explicitly asked
2. **Ask Before Acting**: If unclear about what to do, ask for clarification
3. **Minimal Implementation**: Only implement what is requested, nothing more
4. **Follow Scope**: Focus only on Individual Entrepreneur until told otherwise
5. **Document Changes**: Keep REQUIREMENTS.md updated with any new requirements
6. **Be Concise**: Make small, focused changes rather than implementing everything at once

## Code Implementation Rules

### Computation Logic
- ❌ Do NOT implement calculation/computation logic
- ✅ DO: Prepare empty functions with proper inputs/outputs
- ✅ DO: Add JSDoc comments documenting what function should do
- ✅ DO: Add TODO comments for when logic will be implemented
- Example:
  ```javascript
  /**
   * Calculate salary with taxes applied
   * @param {number} baseSalary - Base salary amount
   * @param {array} taxes - Array of tax objects
   * @returns {object} {grossSalary, taxAmount, netSalary}
   * TODO: Implement calculation logic
   */
  function calculateSalaryWithTaxes(baseSalary, taxes) {
      // TODO: Implement
  }
  ```

### Testing
- ❌ Do NOT write any tests
- ❌ Do NOT create test files
- ⏳ Wait for explicit request to add tests

### Styling & UI
- ✅ DO: Reuse existing button styles (btn-option-large, btn-save, btn-cancel, etc.)
- ❌ Do NOT: Add new custom button styles
- ❌ Do NOT: Create new CSS classes for buttons without explicit request
- If a new button needed → Use existing style or ask "Should I create a new button style?"

## Communication Format

### When User Says:
- **"Let's work on X"** → I should ask what needs to be done
- **"Implement X"** → Do exactly that, nothing more
- **"I'm calling X as Y"** → Remember this shorthand for future conversations
- **"Remove X"** → Remove only what's requested
- **"Add X to Y"** → Make only that specific addition

### When I'm Uncertain:
- Ask: "Should I also implement...?" 
- Ask: "Do you want me to...?"
- Ask: "Is this the scope or should I also...?"

### When Providing Updates:
- Use checkmarks: ✅ for completed items
- Use TODO: for unimplemented features
- Be brief and clear about what changed

## Shorthand References

- **Individual** = Individual Entrepreneur
- **Registered** = Registered Worker
- **Language** = English, Armenian, Russian (all three)
- **Multilanguage** = Requires label/description in all 3 languages with fallback logic

## File Structure

- **index.html** → UI structure and markup
- **js/app.js** → Navigation and main logic
- **js/i18n.js** → Language management
- **js/db.js** → IndexedDB operations
- **REQUIREMENTS.md** → Feature requirements and specifications
- **WORKFLOW.md** → This file - how to work together

## Before Making Changes

1. ✅ Understand the current requirement
2. ✅ Check REQUIREMENTS.md for context
3. ✅ Implement only what was asked
4. ✅ Keep scope minimal
5. ✅ Update REQUIREMENTS.md if adding new features

## Example Interactions

### ❌ Bad - Getting Ahead:
User: "Let's work on taxes"
Me: *Implements entire tax system with calculations and exports*

### ✅ Good - Waiting for Direction:
User: "Let's work on taxes"
Me: "What would you like me to implement? Tax input form, calculation logic, or display?"

### ❌ Bad - Assuming Scope:
User: "Add tax input for individual"
Me: *Adds tax input for both Individual and Registered*

### ✅ Good - Exact Scope:
User: "Add tax input for individual"
Me: *Adds tax input ONLY for Individual, leaves Registered as TODO*

## When to Update REQUIREMENTS.md

- New features are requested
- Workflow changes
- Data structure changes
- UI pattern changes
- New requirements are discovered
- TODO items are clarified

## Quick Checklist Before Submitting

- [ ] Did I implement only what was asked?
- [ ] Did I check REQUIREMENTS.md?
- [ ] Did I follow the UI philosophy?
- [ ] Did I include multilanguage support (if text)?
- [ ] Did I wait for instructions?
- [ ] Did I update REQUIREMENTS.md if needed?
- [ ] Did I avoid implementing computation logic? (Just empty functions with docs)
- [ ] Did I avoid writing tests?
- [ ] Did I reuse existing button styles?
- [ ] Did I avoid creating new CSS classes without request?
