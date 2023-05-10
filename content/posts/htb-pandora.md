---
title: "Hack-the-box writeup Pandora"
date: 2023-05-03T13:49:23+02:00
draft: false
tag: ['writeup', 'hack-the-box', 'ctf']
---

This is a write up for the hack-the-box challenge box `Pandora`. As there was a technical issue connecting to the device using for the attack there are no screenshots in this writeup. Moreover the commands needed to be reconstructed after the this scrip was written and the challenge ended. As i cant remember the ip-address used the used one is chosen comply ran.  

## Initial Access
### TCP port scan
We begin with a port scan using `nmap` to find out witch ports are used and to get a short overview over what potentially could be our attack surface. We discoverd two open ports, running `http:80` and `ssh:22`
```bash
nmap -sV 10.10.33.36 
```
### Following for the red herring
We visited the website hosted over the http protocol seen before. Greeted by a fancy looking website we directly headed for the "send a message"-form. Thereby aspect a SQL vulnerability in one of the user inputs.
Btw we try discovering other web sub directories by fuzzing with `dirmap`.
```bash
dirmap -i 10.10.33.36 -lcf
```
Therby we fount an `assets` directory containing all java script files of the website. But after looking into the scripts we decided that they are not useful and search for something else. 
We also used `sqlmap` to test the response form again, but it responded that there is no available sql injection found. 
Thereby we got stuck for quite a wile. 

### UDP port scan
After a while we got a hint to look away from the website and start looking at the udp ports. Futhermore, we started a `nmap` UDP scan.
```bash
nmap -sU -v 10.10.33.36 
```
Thereby we found out UDP port 162 contains an open SMTP service. A service used to exchange information between different workstations in a network.

### Exploiting SMTP
First we needed to find out the network name of the smtp network. We guessed `public` as it is a common used name and it worked. We later found out that `nmap` is capable of giving information on the names as well.
We used `smtpwalk` to then scan the network finding the string `-u daniel -p HotelBabilon23` by accident. Well that looks like a username and a password to me. 
Using this credentials we could login in into the ssh server as daniel. Wuhu, hard coded credentials for the win.

## Moving latterly
However we quickly found out that daniel has no user flag and no rights to execute anything as root or do anything cool. 
We also found out that there is an other user named matt who owns the user flag.

### Finding pandora and her box
Nevertheless, we listed every file daniel could read. What was quit a lot. 
Reading the dumped file names we found that in `/var/www/` next to the `./html` folder there exists a folder with the name `pandora`. Coincidence? I think not.
Inside `./pandora/` we found a `pandora_console`. Pandora console is some kind of web service capable of controlling some think, i guess ;) 
Anyway we found in the apache config file of the console that there is a internal web-server running on `localhost:80` inhibiting the console running as user matt. 

### Port forwarding and reviling the console
We forwarded the console with ssl to the outside, oping it in our webbrowser reveled a login terminal. 
```bash
# code missing
```
Greeted by an other website we now encounter a login form for a `Pandora FMS` service. That website looked kinda legit...
Anyway we started trying some SQL-injections again using `sqlmap`. And again found nothing. 
```bash
sqlmap -u "http://10.10.33.36/pandora.php"
```

### Exploiting Pandora FMS v7.0NG.742
Anyway at the same time, we found out that the version of `Pandora FMS v7.0NG.742` matches the exploited version of [Exploit for CVE-2020-5844 (Pandora FMS v7.0NG.742) - Remote Code Execution](https://github.com/UNICORDev/exploit-CVE-2020-5844) but a username and password are required to use it. Got stuck here again.

After further research we found [CVE-2021-32099 Pandora_v7.0NG.742](https://github.com/shyam0904a/Pandora_v7.0NG.742_exploit_unauthenticated) that is using a SQL injection in the `/pandora_console/include/chart_generator.php?session_id=`.
First we tried to understand the exploited and recreated it on our own but after understanding it we just used it as it was quit easy. 
Using the dropped shell we downloaded our public `ssh-key` into the authorized keys of the machine. 
Wow. Now we could login as matt via `ssh`. 
Utilizing this we than sshed onto the machine as matt. **Userflag extracted!**

## Owning the system
### Finding and inspecting pandora_backup
Ok now we are matt, but how to escalate privileges? Well, we have dwelt too long on this question.
Anyway we kinda forgot to do the obvious. Looking for the good old `SETUID`-Bit. Searching for all executables with the SETUID-Bit set returned a lot of crap and the suspicious `/usr/bin/pandora_backup`. 
As we had no better idea for reverse energiering this we inspected the executable with `xxd`. Learning it the hard way.

### Exploiting sudo tar
Anyway it reviled that the backup programme uses the tar command as root to create a backup in `/root/`.
We deduct, it using the tar command unfiltered, hardcoded as root is a bad idea. 
Creating our own `tar` program, making it executable and inserting the current `pwd` to the $PATH environment variable did the job.
```bash
echo "/bin/bash -i > tar" 
chmod +x tar
export (pwd):$PATH $PATH
```
Executing the backup script again resulted in changing our shell to a root shell. Tada!

## Pwded