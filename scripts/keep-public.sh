#!/bin/bash
while true; do
  RESP=$(curl -sS -X POST "https://ext.tiiny.host/v1/upload" \
    -H "x-email: cuijinqueen@163.com" \
    -F "files=@/workspace/docs/index.html;filename=index.html")
  LINK=$(echo "$RESP" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('data',{}).get('link',''))" 2>/dev/null)
  if [ -n "$LINK" ]; then
    echo "https://$LINK" | tee /tmp/speakrise-public-url.txt /opt/cursor/artifacts/PUBLIC_URL.txt
    echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) https://$LINK" >> /tmp/speakrise-public-url.log
  else
    echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) upload failed: $RESP" >> /tmp/speakrise-public-url.log
  fi
  sleep 2400
done
