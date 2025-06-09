---
title: "Leveraging UAV Data and Deep Learning Models for Detecting Waste in Rivers"
collection: publications
category: manuscripts
permalink: /publication/2009-10-01-paper-title-number-1
excerpt: 'This study presents the first comparative analysis of object detection and segmentation models for automated riverine waste detection in Nepal using UAV imagery, demonstrating that fine-tuned DeepLabv3+ models outperform others and that transfer learning effectively enhances cross-river model generalization.'
date: 2025-06-02
venue: 'IEEE Access'
# slidesurl: 'http://academicpages.github.io/files/slides1.pdf'
paperurl: 'https://ieeexplore.ieee.org/document/11021562'
DOI: '10.1109/ACCESS.2025.3576295'
# bibtexurl: 'http://academicpages.github.io/files/bibtex1.bib'
# citation: 'Your Name, You. (2009). &quot;Paper Title Number 1.&quot; <i>Journal 1</i>. 1(1).'
---
The growing problem of riverine waste pollution threatens water sustainability in Nepal, which is driven largely by rapid urban development and inadequate waste management. This study presents the first comparative evaluation of object detection and segmentation models for automated waste detection using novel datasets of UAV-captured imagery. We introduce four datasets, two for object detection and two segmentation in Bishnumati and Bagmati river. We evaluated three training strategies—training from scratch, full-model fine-tuning, and fine-tuning with frozen layers—and assessed model generalizability through cross-river transfer learning. The study showed that fine-tuning pretrained weights is a better approach for training segmentation models, whereas freezing pretrained backbone layers is better for object detection. DeepLabv3+, trained by fine-tuning pretrained models, performed better than object detection models for waste detection, with precision and recall scores of 0.915 and 0.934 for Bagmati, and 0.913 and 0.939 for Bishnumati. Furthermore, transfer learning across locations improves object detection mAP scores and refines segmentation mask predictions, thereby uncovering previously undetected waste items. The transfer learning fine-tuned DeepLabv3+ model obtained an mIoU score of 0.849 for Bagmati to Bishnumati and 0.841 for Bishnumati to Bagmati transfer learning. Our novel datasets and our methodological blueprint for optimizing deep learning training strategies in riverine environments offer a scalable and adaptable pipeline for automated waste monitoring in riverine environments, particularly valuable for regions with limited surveying infrastructure and for geographically proximate rivers where transfer learning can be effectively applied.

### Citation
```
@article{pati2025leveraging,
  title={Leveraging UAV Data and Deep Learning Models for Detecting Waste in Rivers},
  author={Pati, Bipun Man and Khadka, Bishnu and Thapa, Ukesh and Pal, Sujay Kumar and Sakya, Subarna and Shrestha, Anup and Joshi, Hemant and Pyakurel, Dhiraj and Roy, Prem Chandra},
  journal={IEEE Access},
  year={2025},
  publisher={IEEE}
}
```
