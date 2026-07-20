# 📡 Pardha RF Lab Guide — Parallel Wireless Metro AAU

> **A complete RF engineering reference for B1/B3/B8/B28/B41 Metro AAU validation and testing.**  
> Built from real lab sessions, Parallel Wireless study materials, instrument data, and expert RF knowledge.

---

## 🚀 Quick Access

| File | Description |
|------|-------------|
| **[pardha_rf_complete.html](./pardha_rf_complete.html)** | ⭐ **Main reference guide** — open in any browser, works 100% offline |
| **[docs/](./docs/)** | All source documents from D:\Learning\RCT |

> **How to use:** Download `pardha_rf_complete.html` → open in Chrome/Edge → works offline anywhere.  
> Or view it directly: [GitHub Pages link](https://pardha-saradhi411.github.io/rf-lab-guide/)

---

## 📚 What's Inside the HTML Guide

The single HTML file (`pardha_rf_complete.html`, ~3 MB) contains everything below — fully offline, no internet needed:

### 🔧 Instruments
- **EXA N9010B** — 68 clickable buttons with full explanation, B1/B3/B8/B28/B41 context, tips, warnings
- **EXM E6640A** — VSG + VSA combined, all measurement modes
- **VNA E5071C** — S-parameters, SOLT calibration, phase measurement
- **Live EXA data** — Real SCPI results captured from your EXA at 10.62.2.135 (Jul 15 2026)

### 📖 PW RF Course (M01–M16) — from your D:\Learning\RCT
| Module | Topic |
|--------|-------|
| M01 | dB, dBm, dBFS, link budget, power_monitor |
| M02 | 50Ω world, VSWR, return loss, reflection |
| M03 | TX/RX chain, Friis NF, sensitivity derivation |
| M04 | RSSI, dynamic range, EIRP/TRP, full Rx test family |
| M05 | IQ, constellations, OFDM, EVM limits, IQ playback |
| M06 | DL TX chain, CFR registers, DPD, DAC scale |
| M07 | ACLR (6.6.2), SEM (6.6.3), TDD gating, cable loss |
| M08 | PRACH, Zadoff-Chu, Ncs/ZCZ/K, PRACH detector pipeline |
| M09 | AAU architecture, single DPD, beamforming gain |
| **M09b** | **RFFE TX block diagram — B7/B1/B3 decoded (real image embedded)** |
| **M09c** | **FHGW DL chain diagram — LowPHY→DFE→DAC (real image + registers)** |
| **M09d** | **Real lab screenshots — EXM ACP + Modulation Analysis + TRX1 ACLR** |
| M10 | Lab setup, instruments, platform bring-up, 6 pitfalls |
| M11 | PA efficiency, dynamic Vdd (40→32→25V), bias sequencing |
| M12 | tc_cadence, Test-IDs, Group-IDs, 4G vs 5G config |
| M13 | uSleep, PA protection, RSSI accuracy, IQ playback CLI |
| M14 | ADC calibration, B1→ADC 0,1,4,5 / B3→ADC 2,3,6,7 |
| M15 | UL RCT embedded, 4-stage pipeline, ul-rct-test CLI |
| M16 | TDD frame structure, SSF config 7/8, PSS/SSS positions |

### 📊 Signal Chain Diagrams (with real images)
- **RF Signal Chain** (M16a–d): LNA → VGA → Mixer → ADC → FFT → BFP → eCPRI → DU
- **FHGW DL Chain** (M09c): LowPHY (DUC→Adder) → DFE (Gain→CFR→Gain→DPD→GainPerCh) → DAC
- **RFFE TX Block** (M09b): Phase shifter → BPF → V ATT → Pre-driver → PA → Coupler → Circulator → Filter → Diplexer → TX_A

### 🧪 Operational Docs
- **4G Test Plan** — antenna port mapping, P_rated table, NETCONF bring-up sequence
- **Validation Handbook** — CI/CD, Jenkins jobs per band, 8 PreChecks
- **RSSI Results** — real ADC calibration data (ADC 0–7, per-antenna results)
- **PA Efficiency Test Plan** — Dynamic Vdd table, CFR compensation procedure
- **FHGW Embedded RCT** — 4-stage pipeline, ul-rct-test CLI, memory management
- **RuAuto Framework** — 3-layer architecture, test catalog, all 8 PreChecks

### 🔬 Expert RF Topics
- **PLL/LO phase noise** — ÷N multiplication, 20·log(N) penalty, EXA measurement
- **Mixer theory** — image frequency, zero-IF, IQ imbalance, IRR formula
- **PA Classes A/B/AB/C/Doherty** — efficiency vs linearity, why Doherty for LTE/5G
- **Noise floor derivation** — kTB from first principles, −174 dBm/Hz, Boltzmann
- **Constellation diagnosis** — 12-pattern table: PA compression, phase noise, DC offset, IQ imbalance
- **ACLR measurement** — full EXA setup guide, failure pattern table, SCPI automation
- **Spectrum analyzer** — RBW/VBW, DANL, dynamic range, sweep time
- **dBFS ↔ dBm conversion** — ADC_ADJUST, hardware.json, real calibration numbers

### 📡 VNA Phase & Angle Calibration (VNA1–VNA7)
- SOLT calibration — 12-step procedure on E5071C
- Cable electrical length matching — 1 mm of SF141 = 3.72° at 2140 MHz
- Antenna element phase measurement — pre/post OB_CAL procedure
- PE44820DS phase shifter verification — bit-by-bit test
- Beam angle formula — θ = arcsin(λ·ΔΦ / 2π·d)
- Worked example — unit 509 B1 full calibration sequence

### 🎥 Learning Resources
- 4 YouTube videos fully decoded (aQd_zBytid8, 1xGncBvWv6U, rMVAQsUudSs, swjgr4YBhRM)
- 15 YouTube channels with exact videos to watch
- 12-week learning plan tailored for RF test engineer background

---

## 📁 Document Library (docs/)

### PW Course Modules (source Word documents)
| File | Content |
|------|---------|
| Module1_Decibel_and_RF_Power.docx | dB, dBm, dBFS, link budget |
| Module2_The_50_Ohm_World.docx | Impedance, VSWR, return loss |
| Module3_The_RF_Chain.docx | TX/RX chain, noise figure |
| Module4_Key_Radio_Metrics.docx | RSSI, sensitivity, EVM, ACLR |
| Module5_Modulation_and_IQ.docx | IQ, OFDM, constellations |
| Module6_PA_Linearity_and_DPD.docx | DPD, CFR, PA compression |
| Module7_ACLR_and_Spectrum.docx | ACLR, SEM, TDD gating |
| Module8_PRACH.docx | PRACH, Zadoff-Chu sequences |
| Module9_AAU_Architecture.docx | Board split, beamforming, single DPD |
| Module10_Lab_and_Measurement.docx | Bench setup, instruments, pitfalls |
| Module11_PA_Efficiency.docx | Dynamic Vdd, Doherty, gate bias |
| Module12_Reading_the_RCT_Configs.docx | tc_cadence, Test-IDs, JSON structure |
| Module13_RU_Features_and_Operations.docx | uSleep, RSSI accuracy, IQ playback |
| Module14_RSSI_and_Receive_Chain.docx | ADC calibration, dBFS conversion |
| Module15_UL_RCT_Embedded_Dynamic_Test.docx | Embedded RCT, 4-stage pipeline |
| Module16_TDD_LTE_and_PHY_Impact.docx | TDD frame, SSF config, PSS/SSS |

### Reference Documents
| File | Content |
|------|---------|
| 00_START_HERE_Learning_Path.docx | Where to start |
| RF_RCT_Glossary.docx | All terms defined |
| Ref_Band_Plan_and_FrontEnd.docx | Band plan, frequency mapping |
| Ref_Conformance_Test_Methodology.docx | 3GPP conformance methodology |
| Ref_Validation_Team_and_CICD.docx | Team process, CI/CD pipeline |
| RuAuto_RCT_Framework_Field_Guide.docx | RuAuto 3-layer arch, all tests |
| 4G_RCT_Test_Catalog.docx | Full 4G test catalog |
| all4G_test_plan.docx | 4G test plan with procedures |
| FHGW User Guide.docx | FHGW operations guide |

### Hardware Schematics (PDFs)
| File | Content |
|------|---------|
| AAU_5BAND_RFFE_B1B3B41_Blockdiagram.pdf | RFFE block diagram B1/B3/B41 |
| AAU_5BAND_midBRD_B1B3_Blockdiagram.pdf | Mid-board B1B3 block diagram |
| RFFE-B8B20B28-SCHEMATICS-V1P4.pdf | RFFE schematics B8/B20/B28 |
| midBRD-B41-V1P4.pdf | Mid-board B41 schematics |

---

## 🛠 Your Lab Setup

| Instrument | Model | IP | Serial | Purpose |
|------------|-------|-----|--------|---------|
| EXA Signal Analyzer | N9010B | 10.62.2.135 | MY59070653 | ACLR, SEM, Phase Noise |
| EXM Vector Transceiver | E6640A | — | — | TX/RX combined testing |
| VNA | E5071C | — | — | S-params, phase, cable loss |

**Bands under test:** B1 (2140/1950 MHz) · B3 (1842.5/1747.5 MHz) · B8 (942.5/897.5 MHz) · B28 (758/728 MHz) · B41 (2545 MHz TDD)

---

## 📝 Noise Figure PDF

> **TODO:** Upload `Understanding Noise Figure.pdf` to `docs/` folder.  
> File path on your machine: `D:\Learning\RCT\Understanding Noise Figure - Understanding Noise Figure.pdf`

---

## 🔄 How to Update

```bash
# Clone the repo
git clone https://github.com/pardha-saradhi411/rf-lab-guide.git
cd rf-lab-guide

# Replace the HTML file with a new version
cp /path/to/new/pardha_rf_complete.html .

# Commit and push
git add .
git commit -m "Update RF guide - $(date +%Y-%m-%d)"
git push
```

---

## 👤 Author

**Pardha Saradhi** — RF Test Engineer, Parallel Wireless  
Metro AAU validation · B1/B3/B8/B28/B41 · RuAuto · FHGW · Keysight EXA/EXM/VNA

---

*Built with Claude · Last updated: July 2026*
