# HVAC Lab — Quality, Diagnostic Safety & WCAG 2.2 AA Accessibility Standards

> **Document Status**: Approved  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-19  
> **Related Docs**: [04-engineering-formulas-and-algorithms.md](./04-engineering-formulas-and-algorithms.md), [08-engineering-source-register.md](./08-engineering-source-register.md), [06-powerlab-inspired-system-specs.md](./06-powerlab-inspired-system-specs.md)

---

## 1. Diagnostic Safety & Decision-Support Guardrails

HVAC systems involve pressurized refrigerants, high-voltage electrical circuits, and fuel-burning combustion appliances. Software calculations must operate strictly as **decision-support tools**, never replacing professional diagnostic workflows, manufacturer charging charts, or licensed on-site trade inspections.

### 1.1 Non-Definitive Diagnostic Language Policy
In field diagnostic calculators (`superheat-subcooling-calculator`), a single mathematical delta must **never trigger an unconditional directive** such as `"Add Refrigerant"` or `"Recover Refrigerant"`. System behavior often mimics undercharge when the actual fault is low evaporator airflow (dirty air filter, blocked return, failed blower motor) or a restricted liquid line filter drier.

#### Mandatory Diagnostic Output Phrasing:

```
❌ INCORRECT (Overly Definitive / High Liability):
"System is undercharged. Add 1.5 lbs of R-410A immediately."

✅ CORRECT (Engineering Decision-Support):
"Indication: Possible Undercharge or Liquid Line Restriction.
Measured superheat (18.5°F) is higher than target (12.0°F) and subcooling (4.2°F) is lower than target (10.0°F).
Next Steps:
1. Verify indoor airflow (clean filter, unobstructed return grilles, blower static pressure).
2. Check temperature drop across liquid line filter drier to rule out restriction.
3. Compare against manufacturer data plate charging table before adjusting refrigerant charge."
```

### 1.2 Multi-Category Safety Cautions & Disclaimers

| Risk Domain | Applicable Calculators | Required Safety Callout & Caution Text |
| :--- | :--- | :--- |
| **A2L Refrigerants (R-454B, R-32)** | `pt-chart`, `superheat-subcooling-calculator` | ⚠️ **A2L Mild Flammability Notice**: R-454B and R-32 are ASHRAE Class A2L mildly flammable refrigerants. Technicians must use spark-proof recovery machines, A2L-rated vacuum pumps and digital manifold gauges, and verify active leak sensors/ventilation before servicing. |
| **Combustion & Backdrafting** | `kitchen-hood-cfm`, `furnace-size-calculator` | ⚠️ **Combustion Backdraft & Carbon Monoxide Warning**: Exhaust fans $>400\text{ CFM}$ create severe indoor negative pressure in sealed buildings. Without code-mandated make-up air (IRC M1503.6), dangerous carbon monoxide gases can be pulled back from gas water heaters and furnaces into living areas. |
| **Electrical Resistance Heating** | `heat-pump-size-calculator`, `garage-heater-sizing` | ⚠️ **Electrical Circuit Notice**: Backup electric heat strips (5kW–20kW) require dedicated 240V high-amperage breakers (30A–100A) and properly rated copper conductors. Electrical work must comply with NEC Article 220 & 440. |
| **Screening Sizing vs Manual J** | `btu-calculator`, `ac-tonnage-calculator`, `furnace-size-calculator` | ℹ️ **Design Sizing Disclaimer**: This tool provides rapid screening estimates based on standard regional heat loss/gain factors. Final equipment selection for permitted installation must follow certified ACCA Manual J/S/D calculations and local building code requirements. |

---

## 2. WCAG 2.2 AA Accessibility Standards

HVAC Lab is committed to full accessibility compliance targeting **WCAG 2.2 Level AA** across all desktop, tablet, and mobile platforms.

```
                               ┌──────────────────────────────────────────────┐
                               │        WCAG 2.2 AA COMPLIANCE FRAMEWORK      │
                               └──────────────────────┬───────────────────────┘
                                                      │
     ┌──────────────────┬──────────────────────┬──────┴───────────────┬──────────────────────┬──────────────────┐
     ▼                  ▼                      ▼                      ▼                      ▼                  ▼
[ Keyboard Nav ]   [ Visible Focus ]      [ Screen Readers ]     [ Color & Contrast ]   [ Touch Targets ]    [ Motion & Print ]
100% Tab-Navigable High-Contrast Ring     aria-live Announcements 4.5:1 Text Contrast    Minimum 44x44px      prefers-reduced-motion
Arrow Key Sliders  :focus-visible Only    aria-describedby Links  No Color-Only Info     Mobile Finger Tap    Accessible Print CSS
```

---

### 2.1 Complete Keyboard Operation
* **Full Focusability**: Every input field, slider, stepper button, preset chip, dropdown, modal trigger, and export button is 100% operable via `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Arrow` keys.
* **Dual Slider Keyboard Controls**: Custom range sliders support `Left`/`Right` arrow keys for fine adjustments (1 step) and `PageUp`/`PageDown` or `Home`/`End` for major adjustments.
* **Visible Focus Indicators**: High-contrast, non-obtrusive 2px focus ring (`outline: 2px solid var(--accent-primary); outline-offset: 2px;`) rendered exclusively via `:focus-visible` to avoid mouse-click clutter while assisting keyboard navigators.

### 2.2 Screen Reader Semantics & ARIA Integration
* **Explicit `<label>` Associations**: Every numerical input and select dropdown has an explicitly paired `<label htmlFor="input-id">`.
* **Dynamic Result Announcements (`aria-live="polite"`)**: Primary result cards employ `aria-live="polite"` and `aria-atomic="true"`, allowing screen readers (NVDA, JAWS, VoiceOver) to announce updated engineering values without interrupting active user input.
* **Descriptive Help Links (`aria-describedby`)**: Unit labels, valid boundary ranges, and help tooltips link to inputs via `aria-describedby="input-help-id"`.

### 2.3 Color Contrast & Visual Indicators
* **Strict Contrast Ratios**: All text satisfies a minimum contrast ratio of **4.5:1** against backgrounds (and **3:1** for large headings $\ge 18\text{pt}$ and graphical UI components) in both dark and light modes.
* **No Information Conveyed via Color Alone**: Status badges (e.g. Optimal, Undercharge, Overcharge) combine distinct color fills with explicit text labels and universal geometric icons (🟢 Checkmark, 🟡 Warning Triangle, 🔴 Exclamation Octagon).

### 2.4 Textual Equivalents for Visual Canvas & SVG Elements
* **HTML5 Canvas Duct Cross-Section**: Includes an accessible `role="img"` container with a real-time updating `aria-label` (e.g. `"2D diagram showing 14.2 inch round duct and 18 by 10 inch rectangular duct with airflow velocity of 1,087 feet per minute"`).
* **Load Breakdown Donut Chart**: Accompanied by an accessible, structured HTML table representation directly below the graphic.

### 2.5 Touch Target Dimensions & Mobile Usability
* **Minimum 44x44 CSS px**: All interactive buttons, chips, tabs, and menu triggers satisfy the minimum 44x44px bounding box to prevent accidental mistaps on mobile devices in field conditions.
* **Input Mode Attributes**: Numerical inputs specify `inputmode="decimal"` or `inputmode="numeric"` to trigger the numeric keypad on iOS and Android devices.

### 2.6 Reduced Motion & Print Accessibility
* **`prefers-reduced-motion`**: Respects OS motion preferences by disabling sliding transitions and gauge needle animations for users sensitive to vestibular motion.
* **Clean Print Stylesheet (`@media print`)**: Formats all calculator outputs, formulas, and diagrams in clean high-contrast black/white with zero dark-mode ink waste, suppressed interactive widgets, and clean page breaks.
