# Base Assumptions

To actually go about benchmarking Substrate, we must make many different assumptions which will be stated here.

There may be more specific assumptions which are covered in the individual pages of the different benchmarks, but any shared assumptions will be found here.

## Hardware

We ordered a `RISE-2` machine from:

https://www.ovh.co.uk/dedicated_servers/prices/

<img width="1118" alt="image" src="https://user-images.githubusercontent.com/1860335/80716543-0d6d2280-8af8-11ea-9fac-ba2a9c3d6179.png">

### Processor

<details>
  <summary><code>lscpu - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz (expand)</code></summary>

```
shawntabrizi@bm2:~$ lscpu
Architecture:                    x86_64
CPU op-mode(s):                  32-bit, 64-bit
Byte Order:                      Little Endian
Address sizes:                   39 bits physical, 48 bits virtual
CPU(s):                          8
On-line CPU(s) list:             0-7
Thread(s) per core:              2
Core(s) per socket:              4
Socket(s):                       1
NUMA node(s):                    1
Vendor ID:                       GenuineIntel
CPU family:                      6
Model:                           158
Model name:                      Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
Stepping:                        9
CPU MHz:                         801.237
CPU max MHz:                     4500.0000
CPU min MHz:                     800.0000
BogoMIPS:                        8400.00
Virtualization:                  VT-x
L1d cache:                       128 KiB
L1i cache:                       128 KiB
L2 cache:                        1 MiB
L3 cache:                        8 MiB
NUMA node0 CPU(s):               0-7
Vulnerability Itlb multihit:     KVM: Mitigation: Split huge pages
Vulnerability L1tf:              Mitigation; PTE Inversion; VMX conditional cache flushes, SMT vulnerable
Vulnerability Mds:               Mitigation; Clear CPU buffers; SMT vulnerable
Vulnerability Meltdown:          Mitigation; PTI
Vulnerability Spec store bypass: Mitigation; Speculative Store Bypass disabled via prctl and seccomp
Vulnerability Spectre v1:        Mitigation; usercopy/swapgs barriers and __user pointer sanitization
Vulnerability Spectre v2:        Mitigation; Full generic retpoline, IBPB conditional, IBRS_FW, STIBP conditional, RSB filling
Vulnerability Tsx async abort:   Mitigation; Clear CPU buffers; SMT vulnerable
Flags:                           fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc
                                 art arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc cpuid aperfmperf pni pclmulqdq dtes64 monitor ds_cpl vmx est tm2 ssse3 sdbg fma cx16 xtpr pdcm pcid
                                 sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand lahf_lm abm 3dnowprefetch cpuid_fault epb invpcid_single pti ssbd ibrs ibpb stibp t
                                 pr_shadow vnmi flexpriority ept vpid ept_ad fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm mpx rdseed adx smap clflushopt intel_pt xsaveopt xsavec x
                                 getbv1 xsaves dtherm ida arat pln pts hwp hwp_notify hwp_act_window hwp_epp md_clear flush_l1d
```
</details>

### Memory

64 GB (4x 16GB), DDR4, 2400 MHz

### Hard Drive

Base disk speed is benchmarked with the following command:

```
fio --randrepeat=1 --ioengine=posixaio --direct=1 --gtod_reduce=1 --name=test --filename=test --bs=4k --iodepth=64 --size=4G --readwrite=randrw --rwmixread=75
```


<details>
  <summary><code>fio disk benchmark (expand)</code></summary>

```
shawntabrizi@bm2:~$ fio --randrepeat=1 --ioengine=posixaio --direct=1 --gtod_reduce=1 --name=test --filename=test --bs=4k --iodepth=64 --size=4G --readwrite=randrw --rwmixread=75
test: (g=0): rw=randrw, bs=(R) 4096B-4096B, (W) 4096B-4096B, (T) 4096B-4096B, ioengine=posixaio, iodepth=64
fio-3.16
Starting 1 process
test: Laying out IO file (1 file / 4096MiB)
Jobs: 1 (f=1): [m(1)][100.0%][r=35.0MiB/s,w=11.7MiB/s][r=8971,w=3003 IOPS][eta 00m:00s]
test: (groupid=0, jobs=1): err= 0: pid=420008: Thu Apr 30 12:17:30 2020
  read: IOPS=8706, BW=34.0MiB/s (35.7MB/s)(3070MiB/90264msec)
   bw (  KiB/s): min=25560, max=39424, per=100.00%, avg=34829.23, stdev=3562.50, samples=180
   iops        : min= 6390, max= 9856, avg=8707.31, stdev=890.63, samples=180
  write: IOPS=2909, BW=11.4MiB/s (11.9MB/s)(1026MiB/90264msec); 0 zone resets
   bw (  KiB/s): min= 8272, max=13608, per=100.00%, avg=11640.60, stdev=1243.48, samples=180
   iops        : min= 2068, max= 3402, avg=2910.14, stdev=310.87, samples=180
  cpu          : usr=4.66%, sys=1.41%, ctx=125430, majf=0, minf=44
  IO depths    : 1=0.1%, 2=0.1%, 4=0.1%, 8=0.1%, 16=0.5%, 32=87.1%, >=64=12.4%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=93.6%, 8=2.4%, 16=2.5%, 32=1.3%, 64=0.1%, >=64=0.0%
     issued rwts: total=785920,262656,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=64

Run status group 0 (all jobs):
   READ: bw=34.0MiB/s (35.7MB/s), 34.0MiB/s-34.0MiB/s (35.7MB/s-35.7MB/s), io=3070MiB (3219MB), run=90264-90264msec
  WRITE: bw=11.4MiB/s (11.9MB/s), 11.4MiB/s-11.4MiB/s (11.9MB/s-11.9MB/s), io=1026MiB (1076MB), run=90264-90264msec

Disk stats (read/write):
    md127: ios=785753/263123, merge=0/0, ticks=0/0, in_queue=0, util=0.00%, aggrios=392960/263082, aggrmerge=0/99, aggrticks=40357/9123, aggrin_queue=5626, aggrutil=99.94%
  nvme1n1: ios=229/263082, merge=0/99, ticks=25/9427, in_queue=5976, util=99.93%
  nvme0n1: ios=785691/263082, merge=0/99, ticks=80689/8819, in_queue=5276, util=99.94%
```

</details>


### Drivers

<details>
  <summary><code>lspci driver details(expand)</code></summary>

```
00:00.0 Host bridge: Intel Corporation Xeon E3-1200 v6/7th Gen Core Processor Host Bridge/DRAM Registers (rev 05)
	Subsystem: Intel Corporation Xeon E3-1200 v6/7th Gen Core Processor Host Bridge/DRAM Registers
	Flags: bus master, fast devsel, latency 0
	Capabilities: [e0] Vendor Specific Information: Len=10 <?>
	Kernel driver in use: skl_uncore

00:01.0 PCI bridge: Intel Corporation Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor PCIe Controller (x16) (rev 05) (prog-if 00 [Normal decode])
	Flags: bus master, fast devsel, latency 0, IRQ 122
	Bus: primary=00, secondary=01, subordinate=01, sec-latency=0
	I/O behind bridge: [disabled]
	Memory behind bridge: [disabled]
	Prefetchable memory behind bridge: [disabled]
	Capabilities: [88] Subsystem: Intel Corporation Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor PCIe Controller (x16)
	Capabilities: [80] Power Management version 3
	Capabilities: [90] MSI: Enable+ Count=1/1 Maskable- 64bit-
	Capabilities: [a0] Express Root Port (Slot+), MSI 00
	Capabilities: [100] Virtual Channel
	Capabilities: [140] Root Complex Link
	Capabilities: [1c0] Advanced Error Reporting
	Capabilities: [d94] Secondary PCI Express
	Kernel driver in use: pcieport

00:01.1 PCI bridge: Intel Corporation Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor PCIe Controller (x8) (rev 05) (prog-if 00 [Normal decode])
	Flags: bus master, fast devsel, latency 0, IRQ 123
	Bus: primary=00, secondary=02, subordinate=02, sec-latency=0
	I/O behind bridge: [disabled]
	Memory behind bridge: a2e00000-a2efffff [size=1M]
	Prefetchable memory behind bridge: [disabled]
	Capabilities: [88] Subsystem: Intel Corporation Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor PCIe Controller (x8)
	Capabilities: [80] Power Management version 3
	Capabilities: [90] MSI: Enable+ Count=1/1 Maskable- 64bit-
	Capabilities: [a0] Express Root Port (Slot+), MSI 00
	Capabilities: [100] Virtual Channel
	Capabilities: [140] Root Complex Link
	Capabilities: [1c0] Advanced Error Reporting
	Capabilities: [d94] Secondary PCI Express
	Kernel driver in use: pcieport

00:02.0 Display controller: Intel Corporation HD Graphics 630 (rev 04)
	Subsystem: Intel Corporation HD Graphics 630
	Flags: bus master, fast devsel, latency 0, IRQ 255
	Memory at a1000000 (64-bit, non-prefetchable) [size=16M]
	Memory at 90000000 (64-bit, prefetchable) [size=256M]
	I/O ports at 5000 [size=64]
	Capabilities: [40] Vendor Specific Information: Len=0c <?>
	Capabilities: [70] Express Root Complex Integrated Endpoint, MSI 00
	Capabilities: [ac] MSI: Enable- Count=1/1 Maskable- 64bit-
	Capabilities: [d0] Power Management version 2
	Capabilities: [100] Process Address Space ID (PASID)
	Capabilities: [200] Address Translation Service (ATS)
	Capabilities: [300] Page Request Interface (PRI)

00:14.0 USB controller: Intel Corporation 100 Series/C230 Series Chipset Family USB 3.0 xHCI Controller (rev 31) (prog-if 30 [XHCI])
	Subsystem: Intel Corporation 100 Series/C230 Series Chipset Family USB 3.0 xHCI Controller
	Flags: bus master, medium devsel, latency 0, IRQ 128
	Memory at a2f00000 (64-bit, non-prefetchable) [size=64K]
	Capabilities: [70] Power Management version 2
	Capabilities: [80] MSI: Enable+ Count=1/8 Maskable- 64bit+
	Kernel driver in use: xhci_hcd

00:14.2 Signal processing controller: Intel Corporation 100 Series/C230 Series Chipset Family Thermal Subsystem (rev 31)
	Subsystem: Intel Corporation 100 Series/C230 Series Chipset Family Thermal Subsystem
	Flags: bus master, fast devsel, latency 0, IRQ 255
	Memory at 10bff01000 (64-bit, non-prefetchable) [size=4K]
	Capabilities: [50] Power Management version 3
	Capabilities: [80] MSI: Enable- Count=1/1 Maskable- 64bit-

00:16.0 Communication controller: Intel Corporation 100 Series/C230 Series Chipset Family MEI Controller #1 (rev 31)
	Subsystem: Intel Corporation 100 Series/C230 Series Chipset Family MEI Controller
	Flags: fast devsel, IRQ 255
	Memory at a2f17000 (64-bit, non-prefetchable) [disabled] [size=4K]
	Capabilities: [50] Power Management version 3
	Capabilities: [8c] MSI: Enable- Count=1/1 Maskable- 64bit+

00:16.1 Communication controller: Intel Corporation 100 Series/C230 Series Chipset Family MEI Controller #2 (rev 31)
	Subsystem: Intel Corporation 100 Series/C230 Series Chipset Family MEI Controller
	Flags: bus master, fast devsel, latency 0, IRQ 255
	Memory at a2f16000 (64-bit, non-prefetchable) [size=4K]
	Capabilities: [50] Power Management version 3
	Capabilities: [8c] MSI: Enable- Count=1/1 Maskable- 64bit+

00:17.0 SATA controller: Intel Corporation Q170/Q150/B150/H170/H110/Z170/CM236 Chipset SATA Controller [AHCI Mode] (rev 31) (prog-if 01 [AHCI 1.0])
	DeviceName: PCH Integrated SATA Controller
	Subsystem: Intel Corporation Q170/Q150/B150/H170/H110/Z170/CM236 Chipset SATA Controller [AHCI Mode]
	Flags: bus master, 66MHz, medium devsel, latency 0, IRQ 129
	Memory at a2f14000 (32-bit, non-prefetchable) [size=8K]
	Memory at a2f19000 (32-bit, non-prefetchable) [size=256]
	I/O ports at 5080 [size=8]
	I/O ports at 5088 [size=4]
	I/O ports at 5060 [size=32]
	Memory at a2f18000 (32-bit, non-prefetchable) [size=2K]
	Capabilities: [80] MSI: Enable+ Count=1/1 Maskable- 64bit-
	Capabilities: [70] Power Management version 3
	Capabilities: [a8] SATA HBA v1.0
	Kernel driver in use: ahci
	Kernel modules: ahci

00:1c.0 PCI bridge: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port #5 (rev f1) (prog-if 00 [Normal decode])
	Flags: bus master, fast devsel, latency 0, IRQ 124
	Bus: primary=00, secondary=03, subordinate=03, sec-latency=0
	I/O behind bridge: [disabled]
	Memory behind bridge: a2d00000-a2dfffff [size=1M]
	Prefetchable memory behind bridge: [disabled]
	Capabilities: [40] Express Root Port (Slot+), MSI 00
	Capabilities: [80] MSI: Enable+ Count=1/1 Maskable- 64bit-
	Capabilities: [90] Subsystem: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port
	Capabilities: [a0] Power Management version 3
	Capabilities: [100] Advanced Error Reporting
	Capabilities: [140] Access Control Services
	Capabilities: [220] Secondary PCI Express
	Kernel driver in use: pcieport

00:1d.0 PCI bridge: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port #10 (rev f1) (prog-if 00 [Normal decode])
	Flags: bus master, fast devsel, latency 0, IRQ 125
	Bus: primary=00, secondary=04, subordinate=04, sec-latency=0
	I/O behind bridge: [disabled]
	Memory behind bridge: a2000000-a28fffff [size=9M]
	Prefetchable memory behind bridge: 00000000a0000000-00000000a0ffffff [size=16M]
	Capabilities: [40] Express Root Port (Slot+), MSI 00
	Capabilities: [80] MSI: Enable+ Count=1/1 Maskable- 64bit-
	Capabilities: [90] Subsystem: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port
	Capabilities: [a0] Power Management version 3
	Capabilities: [100] Advanced Error Reporting
	Capabilities: [140] Access Control Services
	Capabilities: [220] Secondary PCI Express
	Kernel driver in use: pcieport

00:1d.2 PCI bridge: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port #11 (rev f1) (prog-if 00 [Normal decode])
	Flags: bus master, fast devsel, latency 0, IRQ 126
	Bus: primary=00, secondary=05, subordinate=05, sec-latency=0
	I/O behind bridge: 00004000-00004fff [size=4K]
	Memory behind bridge: a2b00000-a2cfffff [size=2M]
	Prefetchable memory behind bridge: [disabled]
	Capabilities: [40] Express Root Port (Slot+), MSI 00
	Capabilities: [80] MSI: Enable+ Count=1/1 Maskable- 64bit-
	Capabilities: [90] Subsystem: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port
	Capabilities: [a0] Power Management version 3
	Capabilities: [100] Advanced Error Reporting
	Capabilities: [140] Access Control Services
	Capabilities: [220] Secondary PCI Express
	Kernel driver in use: pcieport

00:1d.3 PCI bridge: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port #12 (rev f1) (prog-if 00 [Normal decode])
	Flags: bus master, fast devsel, latency 0, IRQ 127
	Bus: primary=00, secondary=06, subordinate=06, sec-latency=0
	I/O behind bridge: 00003000-00003fff [size=4K]
	Memory behind bridge: a2900000-a2afffff [size=2M]
	Prefetchable memory behind bridge: [disabled]
	Capabilities: [40] Express Root Port (Slot+), MSI 00
	Capabilities: [80] MSI: Enable+ Count=1/1 Maskable- 64bit-
	Capabilities: [90] Subsystem: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port
	Capabilities: [a0] Power Management version 3
	Capabilities: [100] Advanced Error Reporting
	Capabilities: [140] Access Control Services
	Capabilities: [220] Secondary PCI Express
	Kernel driver in use: pcieport

00:1f.0 ISA bridge: Intel Corporation C236 Chipset LPC/eSPI Controller (rev 31)
	Subsystem: Intel Corporation C236 Chipset LPC/eSPI Controller
	Flags: bus master, medium devsel, latency 0

00:1f.2 Memory controller: Intel Corporation 100 Series/C230 Series Chipset Family Power Management Controller (rev 31)
	Subsystem: Intel Corporation 100 Series/C230 Series Chipset Family Power Management Controller
	Flags: bus master, fast devsel, latency 0
	Memory at a2f10000 (32-bit, non-prefetchable) [size=16K]

00:1f.4 SMBus: Intel Corporation 100 Series/C230 Series Chipset Family SMBus (rev 31)
	Subsystem: Intel Corporation 100 Series/C230 Series Chipset Family SMBus
	Flags: medium devsel, IRQ 255
	Memory at 10bff00000 (64-bit, non-prefetchable) [size=256]
	I/O ports at 5040 [size=32]

02:00.0 Non-Volatile memory controller: Intel Corporation PCIe Data Center SSD (rev 02) (prog-if 02 [NVM Express])
	Subsystem: Intel Corporation DC P3500 SSD [2.5" SFF]
	Flags: bus master, fast devsel, latency 0, IRQ 17, NUMA node 0
	Memory at a2e00000 (64-bit, non-prefetchable) [size=16K]
	Expansion ROM at a2e10000 [disabled] [size=64K]
	Capabilities: [40] Power Management version 3
	Capabilities: [50] MSI-X: Enable+ Count=32 Masked-
	Capabilities: [60] Express Endpoint, MSI 00
	Capabilities: [100] Advanced Error Reporting
	Capabilities: [150] Virtual Channel
	Capabilities: [180] Power Budgeting <?>
	Capabilities: [190] Alternative Routing-ID Interpretation (ARI)
	Capabilities: [270] Device Serial Number 00-00-2e-41-00-00-67-ef
	Capabilities: [2a0] Secondary PCI Express
	Kernel driver in use: nvme
	Kernel modules: nvme

03:00.0 Non-Volatile memory controller: Intel Corporation PCIe Data Center SSD (rev 02) (prog-if 02 [NVM Express])
	DeviceName: SAS
	Subsystem: Intel Corporation DC P3500 SSD [2.5" SFF]
	Flags: bus master, fast devsel, latency 0, IRQ 16, NUMA node 0
	Memory at a2d00000 (64-bit, non-prefetchable) [size=16K]
	Expansion ROM at a2d10000 [disabled] [size=64K]
	Capabilities: [40] Power Management version 3
	Capabilities: [50] MSI-X: Enable+ Count=32 Masked-
	Capabilities: [60] Express Endpoint, MSI 00
	Capabilities: [100] Advanced Error Reporting
	Capabilities: [150] Virtual Channel
	Capabilities: [180] Power Budgeting <?>
	Capabilities: [190] Alternative Routing-ID Interpretation (ARI)
	Capabilities: [270] Device Serial Number 00-00-2e-41-00-00-60-3a
	Capabilities: [2a0] Secondary PCI Express
	Kernel driver in use: nvme
	Kernel modules: nvme

04:00.0 VGA compatible controller: Matrox Electronics Systems Ltd. MGA G200e [Pilot] ServerEngines (SEP1) (rev 05) (prog-if 00 [VGA controller])
	DeviceName: ServerEngines Pilot III
	Subsystem: Intel Corporation MGA G200e [Pilot] ServerEngines (SEP1)
	Flags: bus master, fast devsel, latency 0, IRQ 255
	Memory at a0000000 (32-bit, prefetchable) [size=16M]
	Memory at a2800000 (32-bit, non-prefetchable) [size=16K]
	Memory at a2000000 (32-bit, non-prefetchable) [size=8M]
	Expansion ROM at a2810000 [disabled] [size=64K]
	Capabilities: [dc] Power Management version 2
	Capabilities: [e4] Express Legacy Endpoint, MSI 00
	Capabilities: [54] MSI: Enable- Count=1/1 Maskable- 64bit-

05:00.0 Ethernet controller: Intel Corporation I210 Gigabit Network Connection (rev 03)
	DeviceName: Intel I210
	Subsystem: Intel Corporation I210 Gigabit Network Connection
	Flags: bus master, fast devsel, latency 0, IRQ 18
	Memory at a2b00000 (32-bit, non-prefetchable) [size=1M]
	I/O ports at 4000 [size=32]
	Memory at a2c00000 (32-bit, non-prefetchable) [size=16K]
	Capabilities: [40] Power Management version 3
	Capabilities: [50] MSI: Enable- Count=1/1 Maskable+ 64bit+
	Capabilities: [70] MSI-X: Enable+ Count=5 Masked-
	Capabilities: [a0] Express Endpoint, MSI 00
	Capabilities: [100] Advanced Error Reporting
	Capabilities: [140] Device Serial Number a4-bf-01-ff-ff-18-2c-4e
	Capabilities: [1a0] Transaction Processing Hints
	Kernel driver in use: igb
	Kernel modules: igb

06:00.0 Ethernet controller: Intel Corporation I210 Gigabit Network Connection (rev 03)
	DeviceName: Intel I210
	Subsystem: Intel Corporation I210 Gigabit Network Connection
	Flags: bus master, fast devsel, latency 0, IRQ 19
	Memory at a2900000 (32-bit, non-prefetchable) [size=1M]
	I/O ports at 3000 [size=32]
	Memory at a2a00000 (32-bit, non-prefetchable) [size=16K]
	Capabilities: [40] Power Management version 3
	Capabilities: [50] MSI: Enable- Count=1/1 Maskable+ 64bit+
	Capabilities: [70] MSI-X: Enable+ Count=5 Masked-
	Capabilities: [a0] Express Endpoint, MSI 00
	Capabilities: [100] Advanced Error Reporting
	Capabilities: [140] Device Serial Number a4-bf-01-ff-ff-18-2c-4f
	Capabilities: [1a0] Transaction Processing Hints
	Kernel driver in use: igb
	Kernel modules: igb
```

</details>

### Other Hardware

<details>
  <summary><code>lshw (expand)</code></summary>

```
shawntabrizi@bm2:~$ sudo lshw
bm2
    description: Rack Mount Chassis
    product: S1200SP (SKU Number)
    vendor: Intel Corporation
    version: ....................
    serial: ............
    width: 64 bits
    capabilities: smbios-2.7 dmi-2.7 smp vsyscall32
    configuration: administrator_password=disabled boot=normal chassis=rackmount family=Family frontpanel_password=disabled sku=SKU Number uuid=957C3907-F8C9-11E6-AAD1-A4BF01182C4E
  *-core
       description: Motherboard
       product: S1200SP
       vendor: Intel Corporation
       physical id: 0
       version: H57532-250
       serial: QSSA70704838
       slot: Part Component
     *-firmware
          description: BIOS
          vendor: Intel Corporation
          physical id: 6
          version: S1200SP.86B.03.01.0042.013020190050
          date: 01/30/2019
          size: 64KiB
          capacity: 16MiB
          capabilities: pci pnp upgrade shadowing cdboot bootselect edd int13floppy1200 int13floppy720 int13floppy2880 int5printscreen int9keyboard int14serial int17printer int10video acpi usb ls120boot zipboot biosbootspecification netboot uefi
     *-cpu
          description: CPU
          product: Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
          vendor: Intel Corp.
          physical id: 1d
          bus info: cpu@0
          version: Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
          serial: To Be Filled By O.E.M.
          slot: CPU 1
          size: 4388MHz
          capacity: 4500MHz
          width: 64 bits
          clock: 100MHz
          capabilities: lm fpu fpu_exception wp vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp x86-64 constant_tsc art arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc cpuid aperfmperf pni pclmulqdq dtes64 monitor ds_cpl vmx est tm2 ssse3 sdbg fma cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand lahf_lm abm 3dnowprefetch cpuid_fault epb invpcid_single pti ssbd ibrs ibpb stibp tpr_shadow vnmi flexpriority ept vpid ept_ad fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm mpx rdseed adx smap clflushopt intel_pt xsaveopt xsavec xgetbv1 xsaves dtherm ida arat pln pts hwp hwp_notify hwp_act_window hwp_epp md_clear flush_l1d cpufreq
          configuration: cores=4 enabledcores=4 threads=8
        *-cache:0
             description: L1 cache
             physical id: 1a
             slot: L1 Cache
             size: 128KiB
             capacity: 128KiB
             capabilities: synchronous internal write-through instruction
             configuration: level=1
        *-cache:1
             description: L2 cache
             physical id: 1b
             slot: L2 Cache
             size: 1MiB
             capacity: 1MiB
             capabilities: synchronous internal write-through unified
             configuration: level=2
        *-cache:2
             description: L3 cache
             physical id: 1c
             slot: L3 Cache
             size: 8MiB
             capacity: 8MiB
             capabilities: synchronous internal write-back unified
             configuration: level=3
     *-cache
          description: L1 cache
          physical id: 19
          slot: L1 Cache
          size: 128KiB
          capacity: 128KiB
          capabilities: synchronous internal write-through data
          configuration: level=1
     *-memory
          description: System Memory
          physical id: 1e
          slot: System board or motherboard
          size: 64GiB
        *-bank:0
             description: DIMM DDR4 Synchronous 2400 MHz (0.4 ns)
             product: KHX2400C15/16G
             vendor: Kingston
             physical id: 0
             serial: E81EC776
             slot: DIMM_A1
             size: 16GiB
             width: 64 bits
             clock: 2400MHz (0.4ns)
        *-bank:1
             description: DIMM DDR4 Synchronous 2400 MHz (0.4 ns)
             product: KHX2400C15/16G
             vendor: Kingston
             physical id: 1
             serial: 0071E8783
             slot: DIMM_A2
             size: 16GiB
             width: 64 bits
             clock: 2400MHz (0.4ns)
        *-bank:2
             description: DIMM DDR4 Synchronous 2400 MHz (0.4 ns)
             product: KHX2400C15/16G
             vendor: Kingston
             physical id: 2
             serial: ED1EC676
             slot: DIMM_B1
             size: 16GiB
             width: 64 bits
             clock: 2400MHz (0.4ns)
        *-bank:3
             description: DIMM DDR4 Synchronous 2400 MHz (0.4 ns)
             product: KHX2400C15/16G
             vendor: Kingston
             physical id: 3
             serial: 00C1EBB83
             slot: DIMM_B2
             size: 16GiB
             width: 64 bits
             clock: 2400MHz (0.4ns)
     *-pci
          description: Host bridge
          product: Xeon E3-1200 v6/7th Gen Core Processor Host Bridge/DRAM Registers
          vendor: Intel Corporation
          physical id: 100
          bus info: pci@0000:00:00.0
          version: 05
          width: 32 bits
          clock: 33MHz
          configuration: driver=skl_uncore
          resources: irq:0
        *-pci:0
             description: PCI bridge
             product: Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor PCIe Controller (x16)
             vendor: Intel Corporation
             physical id: 1
             bus info: pci@0000:00:01.0
             version: 05
             width: 32 bits
             clock: 33MHz
             capabilities: pci pm msi pciexpress normal_decode bus_master cap_list
             configuration: driver=pcieport
             resources: irq:122
        *-pci:1
             description: PCI bridge
             product: Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor PCIe Controller (x8)
             vendor: Intel Corporation
             physical id: 1.1
             bus info: pci@0000:00:01.1
             version: 05
             width: 32 bits
             clock: 33MHz
             capabilities: pci pm msi pciexpress normal_decode bus_master cap_list
             configuration: driver=pcieport
             resources: irq:123 memory:a2e00000-a2efffff
           *-storage
                description: Non-Volatile memory controller
                product: PCIe Data Center SSD
                vendor: Intel Corporation
                physical id: 0
                bus info: pci@0000:02:00.0
                version: 02
                width: 64 bits
                clock: 33MHz
                capabilities: storage pm msix pciexpress nvm_express bus_master cap_list rom
                configuration: driver=nvme latency=0
                resources: irq:17 memory:a2e00000-a2e03fff memory:a2e10000-a2e1ffff
        *-display UNCLAIMED
             description: Display controller
             product: HD Graphics 630
             vendor: Intel Corporation
             physical id: 2
             bus info: pci@0000:00:02.0
             version: 04
             width: 64 bits
             clock: 33MHz
             capabilities: pciexpress msi pm bus_master cap_list
             configuration: latency=0
             resources: memory:a1000000-a1ffffff memory:90000000-9fffffff ioport:5000(size=64)
        *-usb
             description: USB controller
             product: 100 Series/C230 Series Chipset Family USB 3.0 xHCI Controller
             vendor: Intel Corporation
             physical id: 14
             bus info: pci@0000:00:14.0
             version: 31
             width: 64 bits
             clock: 33MHz
             capabilities: pm msi xhci bus_master cap_list
             configuration: driver=xhci_hcd latency=0
             resources: irq:128 memory:a2f00000-a2f0ffff
           *-usbhost:0
                product: xHCI Host Controller
                vendor: Linux 5.4.0-26-generic xhci-hcd
                physical id: 0
                bus info: usb@1
                logical name: usb1
                version: 5.04
                capabilities: usb-2.00
                configuration: driver=hub slots=16 speed=480Mbit/s
              *-usb
                   description: Keyboard
                   product: Virtual Keyboard and Mouse
                   vendor: American Megatrends Inc.
                   physical id: 1
                   bus info: usb@1:1
                   version: 1.00
                   serial: serial
                   capabilities: usb-2.00
                   configuration: driver=usbhid speed=12Mbit/s
           *-usbhost:1
                product: xHCI Host Controller
                vendor: Linux 5.4.0-26-generic xhci-hcd
                physical id: 1
                bus info: usb@2
                logical name: usb2
                version: 5.04
                capabilities: usb-3.00
                configuration: driver=hub slots=10 speed=5000Mbit/s
        *-generic UNCLAIMED
             description: Signal processing controller
             product: 100 Series/C230 Series Chipset Family Thermal Subsystem
             vendor: Intel Corporation
             physical id: 14.2
             bus info: pci@0000:00:14.2
             version: 31
             width: 64 bits
             clock: 33MHz
             capabilities: pm msi bus_master cap_list
             configuration: latency=0
             resources: iomemory:100-ff memory:10bff01000-10bff01fff
        *-communication:0 UNCLAIMED
             description: Communication controller
             product: 100 Series/C230 Series Chipset Family MEI Controller #1
             vendor: Intel Corporation
             physical id: 16
             bus info: pci@0000:00:16.0
             version: 31
             width: 64 bits
             clock: 33MHz
             capabilities: pm msi cap_list
             configuration: latency=0
             resources: memory:a2f17000-a2f17fff
        *-communication:1 UNCLAIMED
             description: Communication controller
             product: 100 Series/C230 Series Chipset Family MEI Controller #2
             vendor: Intel Corporation
             physical id: 16.1
             bus info: pci@0000:00:16.1
             version: 31
             width: 64 bits
             clock: 33MHz
             capabilities: pm msi bus_master cap_list
             configuration: latency=0
             resources: memory:a2f16000-a2f16fff
        *-sata
             description: SATA controller
             product: Q170/Q150/B150/H170/H110/Z170/CM236 Chipset SATA Controller [AHCI Mode]
             vendor: Intel Corporation
             physical id: 17
             bus info: pci@0000:00:17.0
             version: 31
             width: 32 bits
             clock: 66MHz
             capabilities: sata msi pm ahci_1.0 bus_master cap_list
             configuration: driver=ahci latency=0
             resources: irq:129 memory:a2f14000-a2f15fff memory:a2f19000-a2f190ff ioport:5080(size=8) ioport:5088(size=4) ioport:5060(size=32) memory:a2f18000-a2f187ff
        *-pci:2
             description: PCI bridge
             product: 100 Series/C230 Series Chipset Family PCI Express Root Port #5
             vendor: Intel Corporation
             physical id: 1c
             bus info: pci@0000:00:1c.0
             version: f1
             width: 32 bits
             clock: 33MHz
             capabilities: pci pciexpress msi pm normal_decode bus_master cap_list
             configuration: driver=pcieport
             resources: irq:124 memory:a2d00000-a2dfffff
           *-storage
                description: Non-Volatile memory controller
                product: PCIe Data Center SSD
                vendor: Intel Corporation
                physical id: 0
                bus info: pci@0000:03:00.0
                version: 02
                width: 64 bits
                clock: 33MHz
                capabilities: storage pm msix pciexpress nvm_express bus_master cap_list rom
                configuration: driver=nvme latency=0
                resources: irq:16 memory:a2d00000-a2d03fff memory:a2d10000-a2d1ffff
        *-pci:3
             description: PCI bridge
             product: 100 Series/C230 Series Chipset Family PCI Express Root Port #10
             vendor: Intel Corporation
             physical id: 1d
             bus info: pci@0000:00:1d.0
             version: f1
             width: 32 bits
             clock: 33MHz
             capabilities: pci pciexpress msi pm normal_decode bus_master cap_list
             configuration: driver=pcieport
             resources: irq:125 memory:a2000000-a28fffff ioport:a0000000(size=16777216)
           *-display UNCLAIMED
                description: VGA compatible controller
                product: MGA G200e [Pilot] ServerEngines (SEP1)
                vendor: Matrox Electronics Systems Ltd.
                physical id: 0
                bus info: pci@0000:04:00.0
                version: 05
                width: 32 bits
                clock: 33MHz
                capabilities: pm pciexpress msi vga_controller bus_master cap_list
                configuration: latency=0
                resources: memory:a0000000-a0ffffff memory:a2800000-a2803fff memory:a2000000-a27fffff memory:a2810000-a281ffff
        *-pci:4
             description: PCI bridge
             product: 100 Series/C230 Series Chipset Family PCI Express Root Port #11
             vendor: Intel Corporation
             physical id: 1d.2
             bus info: pci@0000:00:1d.2
             version: f1
             width: 32 bits
             clock: 33MHz
             capabilities: pci pciexpress msi pm normal_decode bus_master cap_list
             configuration: driver=pcieport
             resources: irq:126 ioport:4000(size=4096) memory:a2b00000-a2cfffff
           *-network
                description: Ethernet interface
                product: I210 Gigabit Network Connection
                vendor: Intel Corporation
                physical id: 0
                bus info: pci@0000:05:00.0
                logical name: eno1
                version: 03
                serial: a4:bf:01:18:2c:4e
                size: 1Gbit/s
                capacity: 1Gbit/s
                width: 32 bits
                clock: 33MHz
                capabilities: pm msi msix pciexpress bus_master cap_list ethernet physical tp 10bt 10bt-fd 100bt 100bt-fd 1000bt-fd autonegotiation
                configuration: autonegotiation=on broadcast=yes driver=igb driverversion=5.6.0-k duplex=full firmware=3.25, 0x8000065c ip=149.202.69.202 latency=0 link=yes multicast=yes port=twisted pair speed=1Gbit/s
                resources: irq:18 memory:a2b00000-a2bfffff ioport:4000(size=32) memory:a2c00000-a2c03fff
        *-pci:5
             description: PCI bridge
             product: 100 Series/C230 Series Chipset Family PCI Express Root Port #12
             vendor: Intel Corporation
             physical id: 1d.3
             bus info: pci@0000:00:1d.3
             version: f1
             width: 32 bits
             clock: 33MHz
             capabilities: pci pciexpress msi pm normal_decode bus_master cap_list
             configuration: driver=pcieport
             resources: irq:127 ioport:3000(size=4096) memory:a2900000-a2afffff
           *-network DISABLED
                description: Ethernet interface
                product: I210 Gigabit Network Connection
                vendor: Intel Corporation
                physical id: 0
                bus info: pci@0000:06:00.0
                logical name: eno2
                version: 03
                serial: a4:bf:01:18:2c:4f
                capacity: 1Gbit/s
                width: 32 bits
                clock: 33MHz
                capabilities: pm msi msix pciexpress bus_master cap_list ethernet physical tp 10bt 10bt-fd 100bt 100bt-fd 1000bt-fd autonegotiation
                configuration: autonegotiation=on broadcast=yes driver=igb driverversion=5.6.0-k firmware=3.25, 0x8000065d latency=0 link=no multicast=yes port=twisted pair
                resources: irq:19 memory:a2900000-a29fffff ioport:3000(size=32) memory:a2a00000-a2a03fff
        *-isa
             description: ISA bridge
             product: C236 Chipset LPC/eSPI Controller
             vendor: Intel Corporation
             physical id: 1f
             bus info: pci@0000:00:1f.0
             version: 31
             width: 32 bits
             clock: 33MHz
             capabilities: isa bus_master
             configuration: latency=0
        *-memory UNCLAIMED
             description: Memory controller
             product: 100 Series/C230 Series Chipset Family Power Management Controller
             vendor: Intel Corporation
             physical id: 1f.2
             bus info: pci@0000:00:1f.2
             version: 31
             width: 32 bits
             clock: 33MHz (30.3ns)
             capabilities: bus_master
             configuration: latency=0
             resources: memory:a2f10000-a2f13fff
        *-serial UNCLAIMED
             description: SMBus
             product: 100 Series/C230 Series Chipset Family SMBus
             vendor: Intel Corporation
             physical id: 1f.4
             bus info: pci@0000:00:1f.4
             version: 31
             width: 64 bits
             clock: 33MHz
             configuration: latency=0
             resources: iomemory:100-ff memory:10bff00000-10bff000ff ioport:5040(size=32)
     *-pnp00:00
          product: PnP device PNP0c02
          physical id: 0
          capabilities: pnp
          configuration: driver=system
     *-pnp00:01
          product: PnP device PNP0c02
          physical id: 1
          capabilities: pnp
          configuration: driver=system
     *-pnp00:02
          product: PnP device PNP0c02
          physical id: 2
          capabilities: pnp
          configuration: driver=system
     *-pnp00:03
          product: PnP device PNP0c02
          physical id: 3
          capabilities: pnp
          configuration: driver=system
     *-pnp00:04
          product: PnP device PNP0b00
          physical id: 4
          capabilities: pnp
          configuration: driver=rtc_cmos
     *-pnp00:05
          product: PnP device INT3f0d
          physical id: 5
          capabilities: pnp
          configuration: driver=system
     *-pnp00:06
          product: PnP device PNP0501
          physical id: 7
          capabilities: pnp
          configuration: driver=serial
     *-pnp00:07
          product: PnP device PNP0c02
          physical id: 8
          capabilities: pnp
          configuration: driver=system
     *-pnp00:08
          product: PnP device PNP0c02
          physical id: 9
          capabilities: pnp
          configuration: driver=system
  *-power UNCLAIMED
       description: To Be Filled By O.E.M.
       product: To Be Filled By O.E.M.
       vendor: To Be Filled By O.E.M.
       physical id: 1
       version: To Be Filled By O.E.M.
       serial: To Be Filled By O.E.M.
       capacity: 32768mWh
```
</details>

## Software

### OS

<details>
  <summary><code>Ubuntu 20.04 (expand)</code></summary>

```
$  lsb_release -a
No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 20.04 LTS
Release:	20.04
Codename:	focal
```
</details>

### Rust

<details>
  <summary><code>cargo version (expand)</code></summary>

```
$ cargo --version
cargo 1.43.0 (3532cf738 2020-03-17)
$ rustc --version
rustc 1.43.0 (4fb7144ed 2020-04-20)
```
</details>

## Wasm vs Native

The Substrate runtime can execute in three different modes:

1. Native
2. Interpreted Wasm (`wasmi`)
3. Compiled Wasm (`wasm-time`)

For all of our benchmarks and weight calculations, we use `wasm-time`.

In general, we have found the following:

* Native execution is the fastest for obvious reasons.
* `wasm-time` execution is about 2x slower than native.
* `wasmi` execution is about 10x slower than native.


For example, testing worst-case transfer using our runtime benchmarking setup with the `--dev` chain spec, we get the following results:

* Native: 20 µs
* `wasm-time`: 74 µs
* `wasmi`: 265 µs

The difference in performance may vary depending on how much computation is done versus other operations in the runtime function, but the increase in performance is clear.

## Database

### Key Length

We have generally found that the key length of items in RocksDB does not have a significant impact on the performance of DB operations.

See [Shorter keys #5439](https://github.com/paritytech/substrate/pull/5439).

### Value Size

TODO: The size of a value in storage does matter for encode/decode, but not really for trie traversal?

### Repeat Reads and Writes

Substrate has an abstraction layer that places any reads or writes to the DB into an _overlay change set_. The overlay change set is only committed once per block at the end of the block.

Generally this means we have the following behavior when interacting with the DB from the runtime:

* If you read a storage item for the first time, it will go all the way down to the underlying database and read that value. This would count as a single database read.

* If you read that storage item again, then it will actually read from the overlay change set, not from the DB. So this does not count as a database read.

* If you write to a storage item, it will write to the overlay change set, not the DB. This will also make any future read operation read from the overlay change set.

* At the end of the block, any storage item that has changed will be written to the DB. This counts as a DB write.

For this reason, our DbWeight only measures the cost read and write operations. Any changes in the overlay change set are measured through the runtime benchmarks using Memory DB.

### More Assumptions

Find Database Assumptions on the [database benchmarking page](database.md)

## Polkadot

The current scope of our benchmarking efforts is to launch the Polkadot Network.

### Runtime

Many pallets allow you to mix and match various configuration options which may cause large changes in the behavior of the pallets.

**The current benchmarking/weights will apply only to the FRAME Pallets as configured in the Polkadot Runtime.**

For example, we assume all instances of the `Currency` trait are implemented by the `pallet-balances` crate.

Furthermore, we assume that there is a tight coupling between various consensus and governance pallets:

* Im Online, Session, Staking, and Offences are tightly coupled
* Collective, Membership, and Democracy are tightly coupled
* etc...

These benchmarking results may not be safe for use in runtimes with a different configuration.

### Estimated Maximums

The weight of extrinsics and database operations will grow as the state of the blockchain is populated.

**These weights will only apply as long as these constraints hold for the blockchain state:**

```js
let sale_buyers = 4000;
let active_users = 5000;
let accounts = 100000;
let stakers = 20000;
let staking_history_depth = 84;
let staking_bonding_duration = 28;
let validators = 1000;
let voters = 50000;
let treasury = 1000;
let society = 150;
let parachains = 100;
let parathreads = 1000;
```

This is based on what we think may be a reasonable usage of the Polkadot network for the first year.
