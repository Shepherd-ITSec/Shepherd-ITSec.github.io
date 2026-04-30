---
title: "Linux man7: see-also syscall graph"
date: 2026-04-30T16:30:00+02:00
draft: false
tags: ["linux", "syscalls", "man7", "visualization"]
---

This post embeds an interactive graph generated from the [*man7 “SEE ALSO”*](https://www.man7.org/linux/man-pages/man2/syscalls.2.html#SEE_ALSO) syscall references. It demonstrates which system calls have semantic similaritys.
This might have a practical usage in a syscall vector embedding

You can click nodes to highlight neighbors and explore related syscalls.



<iframe
  src="/man7/see-also_syscall_graph.html"
  title="man7 syscall see-also graph"
  style="width: 100%; height: 900px; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; background: #0b1020;"
></iframe>


If the graph looks cut off, try to <a href="/man7/see-also_syscall_graph.html" target="_blank" rel="noopener noreferrer">open the graph in a new tab</a>.

