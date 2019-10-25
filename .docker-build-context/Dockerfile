# Use the minimal Alpine build.
FROM alpine:3.10

LABEL description="Open dive directory"

VOLUME [ "/sys/fs/cgroup" ]

# Install openrc
RUN apk update && apk add openrc &&\
# Tell openrc its running inside a container, till now that has meant LXC
    sed -i 's/#rc_sys=""/rc_sys="lxc"/g' /etc/rc.conf &&\
# Tell openrc loopback and net are already there, since docker handles the networking
    echo 'rc_provide="loopback net"' >> /etc/rc.conf &&\
# no need for loggers
    sed -i 's/^#\(rc_logger="YES"\)$/\1/' /etc/rc.conf &&\
# can't get ttys unless you run the container in privileged mode
    sed -i '/tty/d' /etc/inittab &&\
# can't set hostname since docker sets it
    sed -i 's/hostname $opts/# hostname $opts/g' /etc/init.d/hostname &&\
# can't mount tmpfs since not privileged
    sed -i 's/mount -t tmpfs/# mount -t tmpfs/g' /lib/rc/sh/init.sh &&\
# can't do cgroups
    sed -i 's/cgroup_add_service /# cgroup_add_service /g' /lib/rc/sh/openrc-run.sh &&\
# clean apk cache
    rm -rf /var/cache/apk/*

# Install packages
RUN apk add curl openssh-client git busybox-initscripts
RUN apk add apache2

# Change apache config to use a non-standard port.
RUN sed -i 's/Listen 80/Listen 2222/' /etc/apache2/httpd.conf
# Provide a ServerName directive to eliminate startup warning.
RUN sed -i '221i ServerName opendivedir.local:2222' /etc/apache2/httpd.conf

# Configure apache to enable mod-rewrite, and support .htaccess file.
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /etc/apache2/httpd.conf
RUN sed -i 's/    AllowOverride None/    AllowOverride All/g' /etc/apache2/httpd.conf

# Add Apache and Cron to the default runlevel, to start when the container starts.
RUN rc-update add crond default && rc-update add apache2 default

CMD ["/sbin/init"]
