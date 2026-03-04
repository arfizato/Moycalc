# Summary of Changes

## Task

Review and redo the tutorial implementation in MoyCalc homepage. The original implementation was a from-scratch overlay that covered the feature it was trying to display, which was deemed "ugly" and "doesn't improve anything". The user requested to find a package online and redo everything.

## Original Issues Found in Review

1. **Duplicate HTML IDs** - Multiple `<a>` elements used `id="descLink"` which violates HTML spec
2. **Inaccessible keyboard handler** - The tutorial backdrop had `tabindex="-1"` making it non-focusable
3. **Missing cleanup** - Reactive statement created timeouts without cleanup on unmount

## Solution Implemented

### 1. Installed driver.js Package

```bash
pnpm add driver.js
```

driver.js is a lightweight (no dependencies) library for creating product tours/walkthroughs with features like:

- Highlight elements on page
- Smooth animations
- Progress indicators
- Keyboard navigation
- Click-outside-to-close

### 2. Rewrote +page.svelte

**Import changes:**

```typescript
// Before (scratch implementation)
import { onMount } from 'svelte/internal';

// After (using driver.js)
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
```

**Removed scratch tutorial code:**

- Removed `showTutorial`, `tutorialStep`, `tutorialSteps` variables
- Removed `nextStep()`, `prevStep()`, `finishTutorial()`, `skipTutorial()` functions
- Removed reactive statement with `setTimeout` for highlighting
- Removed manual tutorial overlay HTML (modal, backdrop, buttons)
- Removed tutorial highlight CSS styles

**New driver.js initialization:**

```typescript
let driverObj: any;

onMount(async () => {
	if (browser) {
		const finishedTutorial = localStorage.getItem('finished-tutorial');
		if (finishedTutorial !== 'true') {
			driverObj = driver({
				showProgress: true,
				animate: true,
				steps: [
					{
						element: '#uni',
						title: 'Select University',
						description: 'Select your university here'
					},
					{ element: '#sem', title: 'Select Semester', description: 'Then select your semester' },
					{
						element: '#createBtn',
						title: 'Create Template',
						description: "If your template doesn't exist, create one here!"
					}
				],
				onDestroyed: () => {
					localStorage.setItem('finished-tutorial', 'true');
				}
			});
			setTimeout(() => driverObj?.start(), 500);
		}
	}
});
```

**Fixed duplicate ID issue:**

- Changed all `id="descLink"` to `class="descLink"` in HTML
- Updated CSS from `#descLink` to `.descLink`

### 3. Build Verification

The project builds successfully:

```bash
pnpm run build
```

Output: Build completed with exit code 0.

## Files Changed

1. `package.json` - Added driver.js dependency
2. `src/routes/+page.svelte` - Complete rewrite of tutorial implementation

## Key Differences from Original

| Aspect         | Original                 | New (driver.js)                 |
| -------------- | ------------------------ | ------------------------------- |
| Implementation | Custom HTML/CSS/JS       | Using driver.js library         |
| Overlay        | Covers entire screen     | Highlights only target elements |
| Accessibility  | Broken keyboard handler  | Built-in keyboard support       |
| Animations     | CSS transitions          | Built-in smooth animations      |
| Progress       | Manual step indicators   | Built-in progress bar           |
| Code size      | ~80 lines of custom code | ~30 lines using library         |
