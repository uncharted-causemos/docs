HOST=http://10.65.18.15:5000/delphi
USER=foo
PASS=bar

# Generated
AUTH=`echo -ne "$USER:$PASS" | base64`
