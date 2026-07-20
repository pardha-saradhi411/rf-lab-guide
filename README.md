# Pardha RF Lab Guide — Parallel Wireless Metro AAU

Complete RF engineering reference for B1/B3/B8/B28/B41 Metro AAU validation and testing.
Built from real lab sessions, Parallel Wireless study materials, and expert RF knowledge.

## Quick Access
- **pardha_rf_complete.html** — Main offline guide (open in browser, 100% offline, ~3MB)
- **docs/** — Source documents from D:\Learning\RCT

## Live URL
https://pardha-saradhi411.github.io/rf-lab-guide/

## Contents of HTML Guide

### PW RF Course (M01-M16 from D:\Learning\RCT)
M01 dB/dBm/dBFS/link budget | M02 50-Ohm/VSWR/return loss | M03 TX-RX chain/Friis NF |
M04 RSSI/sensitivity/EIRP | M05 IQ/OFDM/EVM | M06 DL chain/CFR/DPD/DAC |
M07 ACLR/SEM/TDD gating | M08 PRACH/Zadoff-Chu | M09 AAU architecture/beamforming |
M09b RFFE TX block diagram | M09c FHGW DL chain (real registers) |
M09d Real lab screenshots decoded | M10 Lab setup/instruments |
M11 PA efficiency/Dynamic Vdd | M12 tc_cadence/Test-IDs |
M13 uSleep/RSSI/IQ playback | M14 ADC calibration/dBFS |
M15 UL RCT embedded/ul-rct-test | M16 TDD frame/SSF/PSS-SSS

### Real Lab Data Embedded
- RFFE TX Block Diagram B7/B1/B3 (image embedded)
- FHGW DL Chain LowPHY-DFE-DAC with register values (image embedded)
- EXM ACP B28 low power screenshot
- TRX1 Modulation Analysis EVM+constellation (ADC overrange analysis)
- TRX1 ACLR B28 49.14 dBm PASS
- RCT test setup hand-drawn diagram decoded
- Live EXA SCPI data from 10.62.2.135

### Expert RF Topics
- PA Classes A/B/AB/C/Doherty — efficiency vs linearity
- Noise floor -174 dBm/Hz from kTB (Boltzmann derivation)
- Constellation diagram diagnosis — 12 impairment patterns
- ACLR measurement full setup (EXA step-by-step)
- Spectrum analyzer RBW/VBW/DANL/dynamic range
- dBFS to dBm conversion with real ADC calibration numbers
- PRACH detector internals (noise estimator, peak multiplier, timing advance)
- IQ imbalance IRR formula and EVM floor

### VNA Phase and Angle Calibration (VNA1-VNA7)
- SOLT calibration 12-step procedure on E5071C
- Cable electrical length matching (1mm SF141 = 3.72 deg at 2140 MHz)
- Antenna element phase measurement across all 8/12 elements
- PE44820DS phase shifter bit-by-bit verification
- Beam angle formula: theta = arcsin(lambda x DeltaPhi / 2pi x d)
- Worked example: Unit 509 B1 full calibration sequence

### Instruments
- EXA N9010B (IP 10.62.2.135, SN MY59070653) — 68 clickable buttons
- EXM E6640A — VSG + VSA combined
- VNA E5071C — S-parameters, phase measurement, SOLT calibration

### Bands
B1 2140/1950 MHz | B3 1842.5/1747.5 MHz | B8 942.5/897.5 MHz | B28 758/728 MHz | B41 2545 MHz TDD

### Learning Resources
- 4 YouTube videos fully decoded (aQd_zBytid8, 1xGncBvWv6U, rMVAQsUudSs, swjgr4YBhRM)
- 15 YouTube channels with exact watch lists
- 12-week learning plan

## docs/ Contents

### PW Course Modules
Module1-16 Word documents (source material from D:\Learning\RCT)

### Reference
RuAuto_RCT_Framework_Field_Guide.docx | 4G_RCT_Test_Catalog.docx |
FHGW_User_Guide.docx | RF_RCT_Glossary.docx | all4G_test_plan.docx

### Schematics (docs/schematics/)
AAU_5BAND_RFFE_B1B3B41_Blockdiagram.pdf | AAU_5BAND_midBRD_B1B3_Blockdiagram.pdf |
RFFE-B8B20B28-SCHEMATICS-V1P4.pdf | midBRD-B41-V1P4.pdf

## TODO
- Upload Understanding_Noise_Figure.pdf to docs/ once available

## Author
Pardha Saradhi — RF Test Engineer, Parallel Wireless
Metro AAU validation | B1/B3/B8/B28/B41 | RuAuto | FHGW | EXA/EXM/VNA
Built with Claude | July 2026