# Communication Guidelines

This document provides communication guidelines for AI agents working on the VAIT Homepage project, ensuring consistent, clear, and effective interactions.

## Core Communication Principles

### Clarity and Conciseness
- **Be direct**: Get straight to the point without unnecessary preamble
- **Use precise language**: Avoid ambiguous terms or vague descriptions
- **Structure information**: Use headings, lists, and code blocks effectively
- **Minimize output**: Provide only what's needed for the current task

### Technical Communication
- **Use proper terminology**: Refer to technologies, patterns, and concepts accurately
- **Include context**: Provide relevant background when explaining technical decisions
- **Reference documentation**: Point to existing docs when appropriate
- **Explain trade-offs**: When making decisions, explain the reasoning and alternatives

### Australian English Standards
- **Spelling**: Use Australian English spelling (e.g., 'organisation' not 'organization')
- **Terminology**: Use Australian technical terms where applicable
- **Formatting**: Follow Australian date and number formats in documentation

## Response Patterns

### Code-Related Responses
```markdown
# When providing code solutions:
1. Brief explanation of approach (1-2 sentences max)
2. Code implementation
3. No post-code explanation unless asked

# Example:
"I'll implement the component using React 19 patterns with proper TypeScript typing."

[Code block here]
```

### Error Handling Responses
```markdown
# When encountering errors:
1. Identify the error clearly
2. Explain the cause briefly
3. Provide the solution
4. Include verification steps

# Example:
"The TypeScript error occurs because the component props are not properly typed. I'll fix this by adding proper type definitions."

[Fix code here]

"Run `pnpm run typecheck` to verify the fix."
```

### Task Completion Responses
```markdown
# When completing tasks:
1. Confirm completion
2. Summarize what was done
3. Provide next steps if applicable

# Example:
"Component implemented with proper TypeScript typing and testing. Run `pnpm run test` to verify."
```

## Documentation Standards

### Code Comments
- **Minimal comments**: Only add comments when explicitly requested
- **Self-documenting code**: Write code that explains itself through good naming
- **Complex logic**: Add comments only for genuinely complex business logic

### Commit Messages
- **Conventional commits**: Use standard format (feat:, fix:, docs:, etc.)
- **Descriptive scope**: Include what was changed and why
- **Co-signature**: Add "Co-signed by OpenCode" for agent commits

### Documentation Updates
- **Cross-reference**: Link to existing documentation rather than duplicating
- **Maintain consistency**: Follow established patterns in existing docs
- **Version awareness**: Consider impact on existing documentation

## Technical Discussion Patterns

### Explaining Technical Decisions
```markdown
# Structure for technical explanations:
1. Problem statement
2. Proposed solution
3. Implementation approach
4. Benefits and trade-offs
5. Verification method

# Example:
"The navigation component needs responsive behavior. I'll use CSS Grid with Tailwind classes for flexibility. This approach provides better control over layout compared to Flexbox for this use case. Test by resizing the browser window."
```

### Code Review Communication
```markdown
# When reviewing code:
1. Identify specific issues
2. Explain why it's a problem
3. Suggest concrete improvements
4. Reference relevant patterns or docs

# Example:
"The component uses `any` type on line 15. This violates our TypeScript standards. Replace with proper type definition using the UserProfile interface. See code-style.md for typing patterns."
```

### Architecture Discussions
```markdown
# When discussing architecture:
1. Current state analysis
2. Proposed changes
3. Impact assessment
4. Migration strategy
5. Risk considerations

# Example:
"The current routing structure uses basic React Router. Migrating to TanStack Router provides better type safety and code splitting. We can migrate incrementally starting with the main routes. See docs/architecture.md for current setup."
```

## Error Reporting and Debugging

### Error Communication
```markdown
# When reporting errors:
1. Error type and location
2. Context of when it occurs
3. Relevant code snippet
4. Attempted solutions
5. Request for specific help

# Example:
"TypeScript error in src/components/Hero.tsx:25 - Type 'string' is not assignable to type 'number'. Occurs when building for production. Code snippet shows the prop type mismatch. Need help fixing the type definition."
```

### Debugging Communication
```markdown
# When debugging:
1. Problem description
2. Investigation steps taken
3. Findings and observations
4. Remaining questions
5. Next steps needed

# Example:
"Performance issue with image loading. Investigated using Chrome DevTools, found 3MB hero image causing slow LCP. Optimised to 500KB but still below target. Need help with further optimisation strategies."
```

## User Interaction Patterns

### Question Handling
```markdown
# When users ask questions:
1. Direct answer first
2. Brief explanation if needed
3. Reference to documentation for details
4. Offer follow-up help

# Example:
"Use `pnpm run dev` to start the development server. This command starts Vite with hot module replacement. See commands.md for more development commands."
```

### Task Clarification
```markdown
# When tasks are unclear:
1. Identify ambiguity
2. Ask specific clarifying questions
3. Provide options when appropriate
4. Wait for user confirmation

# Example:
"You mentioned 'optimise the component'. Do you want to focus on performance (bundle size, rendering) or code quality (readability, maintainability)?"
```

### Progress Updates
```markdown
# For long-running tasks:
1. Current status
2. Next steps
3. Estimated completion
4. Any blockers

# Example:
"Component structure created. Next: implement TypeScript interfaces and add tests. Should complete in 2-3 more steps."
```

## Cross-Team Communication

### Developer Handoffs
```markdown
# When handing off to human developers:
1. Summary of changes made
2. Files modified
3. Testing performed
4. Known limitations
5. Recommended next steps

# Example:
"Implemented responsive navigation with TypeScript typing. Modified src/components/ui/nav-bar/ and added tests. All tests passing. Consider adding accessibility testing next."
```

### Documentation Updates
```markdown
# When updating documentation:
1. What changed
2. Why it changed
3. Impact on existing workflows
4. Action items for readers

# Example:
"Updated commands.md to include new TanStack Router workflows. This affects how new routes should be created. Review the new route creation patterns before adding routes."
```

## Communication Tools and Formats

### Markdown Usage
- **Headings**: Use proper heading hierarchy (# ## ###)
- **Code blocks**: Specify language for syntax highlighting
- **Lists**: Use numbered lists for steps, bullet points for options
- **Links**: Use descriptive link text
- **Emphasis**: Use bold for important terms, italics for emphasis

### Code References
```markdown
# Referencing code locations:
- Use format: file-path:line-number
- Example: src/components/Hero.tsx:15
- Include context when helpful

# Example:
"Fix the type error in src/components/Hero.tsx:15 by updating the prop interface."
```

### Command References
```markdown
# When referencing commands:
- Use backticks for inline commands: `pnpm run dev`
- Use code blocks for multi-line commands
- Include expected output when helpful

# Example:
"Run `pnpm run lint:fix` to automatically fix formatting issues."
```

## Quality Assurance

### Communication Review
- **Accuracy**: Ensure technical information is correct
- **Clarity**: Verify message is easy to understand
- **Completeness**: Include necessary context and details
- **Consistency**: Follow established patterns and terminology

### Documentation Maintenance
- **Keep current**: Update communication patterns as project evolves
- **Reference existing**: Link to current documentation rather than duplicating
- **Version awareness**: Consider impact of changes on existing docs

## Cross References

- **Code Style**: See `code-style.md` for coding and formatting standards
- **Commands**: See `commands.md` for command-line communication patterns
- **Development**: See `docs/development.md` for team workflow patterns
- **Contributing**: See `docs/contributing.md` for collaboration guidelines

## Agent-Specific Guidelines

### Response Length
- **Short answers**: 1-3 sentences for simple questions
- **Medium responses**: 1-2 paragraphs for complex explanations
- **Long responses**: Use headings and structure for detailed information

### Proactivity
- **Ask questions**: When tasks are unclear, seek clarification
- **Suggest improvements**: Offer better approaches when appropriate
- **Provide options**: Give choices when multiple solutions exist

### Tone and Style
- **Professional but approachable**: Maintain helpful, expert tone
- **Confident but humble**: Acknowledge limitations when appropriate
- **Action-oriented**: Focus on solutions and next steps
