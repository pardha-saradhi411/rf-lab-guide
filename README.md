# Pardha RF Lab Guide - Parallel Wireless Metro AAU

Complete RF engineering reference for B1/B3/B8/B28/B41 Metro AAU validation.

## Quick Access

- pardha_rf_complete.html - Main offline guide (open in browser, works 100% offline)
- docs/ - All source documents from D:\Learning\RCT
- GitHub Pages: https://pardha-saradhi411.github.io/rf-lab-guide/

## Contents

### PW RF Course (M01-M16)
M01 dB/dBm | M02 50-Ohm/VSWR | M03 TX-RX chain/Friis | M04 RSSI/sensitivity | M05 IQ/OFDM/EVM | M06 DL chain/CFR/DPD | M07 ACLR/SEM/TDD | M08 PRACH | M09 AAU architecture | M09b RFFE TX diagram | M09c FHGW DL chain | M09d Lab screenshots | M10 Lab setup | M11 PA efficiency | M12 tc_cadence | M13 uSleep/RSSI | M14 ADC calibration | M15 UL RCT embedded | M16 TDD PHY

### Real Images Embedded in HTML
- RFFE TX Block Diagram (B7/B1/B3)
- FHGW DL Chain (LowPHY-DFE-DAC with registers)
- EXM ACP screenshot B28 (PASS)
- TRX1 Modulation Analysis (EVM + constellation)
- TRX1 ACLR full power 49.14 dBm (PASS)
- RCT test setup diagram decoded

### Expert RF Topics
- PA classes A/B/AB/C/Doherty
- Noise floor -174 dBm/Hz from kTB
- Constellation diagram diagnosis (12 patterns)
- ACLR full setup guide
- dBFS to dBm conversion
- PRACH detector internals
- VNA phase calibration (SOLT, cable matching, beam angle formula)

### Instruments
- EXA N9010B (IP: 10.62.2.135, SN: MY59070653) - 68 clickable buttons
- EXM E6640A - VSG + VSA
- VNA E5071C - S-params, phase

### Bands
B1 2140/1950 MHz | B3 1842.5/1747.5 MHz | B8 942.5/897.5 MHz | B28 758/728 MHz | B41 2545 MHz TDD

## docs/ Folder

### Modules
Module1_Decibel_and_RF_Power.docx | Module2_The_50_Ohm_World.docx | Module3_The_RF_Chain.docx | Module4_Key_Radio_Metrics.docx | Module5_Modulation_and_IQ.docx | Module6_PA_Linearity_and_DPD.docx | Module7_ACLR_and_Spectrum.docx | Module8_PRACH.docx | Module9_AAU_Architecture.docx | Module10 to Module16

### Reference Docs
RuAuto_RCT_Framework_Field_Guide.docx | 4G_RCT_Test_Catalog.docx | FHGW User Guide.docx | RF_RCT_Glossary.docx | all4G_test_plan.docx | Ref_Band_Plan_and_FrontEnd.docx

### Schematics (docs/schematics/)
AAU_5BAND_RFFE_B1B3B41_Blockdiagram.pdf | AAU_5BAND_midBRD_B1B3_Blockdiagram.pdf | RFFE-B8B20B28-SCHEMATICS-V1P4.pdf | midBRD-B41-V1P4.pdf

## TODO
- Upload Understanding Noise Figure.pdf to docs/

## Author
Pardha Saradhi - RF Test Engineer, Parallel Wireless
Built with Claude - July 2026