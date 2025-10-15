#!/bin/bash

# 🌐 DNS Configuration Check Script
# Verifies your wildcard subdomain DNS is configured correctly

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔═══════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   DNS Configuration Verification Script      ║${NC}"
echo -e "${BLUE}║   For Wedding Landing Subdomain Platform     ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════╝${NC}"
echo ""

# Check if dig is installed
if ! command -v dig &> /dev/null; then
    echo -e "${RED}❌ 'dig' command not found. Please install dnsutils:${NC}"
    echo -e "   ${YELLOW}macOS:${NC} brew install bind"
    echo -e "   ${YELLOW}Ubuntu/Debian:${NC} sudo apt-get install dnsutils"
    echo -e "   ${YELLOW}CentOS/RHEL:${NC} sudo yum install bind-utils"
    exit 1
fi

# Prompt for domain
echo -e "${YELLOW}Enter your domain name (e.g., brollopssidan.se):${NC}"
read -p "Domain: " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo -e "${RED}❌ Domain cannot be empty${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Checking DNS configuration for: ${DOMAIN}${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Function to check DNS record
check_dns() {
    local hostname=$1
    local label=$2
    
    echo -e "${YELLOW}🔍 Checking: ${label}${NC}"
    
    # Try to resolve
    result=$(dig +short "$hostname" 2>&1)
    
    if [ -z "$result" ]; then
        echo -e "${RED}   ❌ No DNS record found${NC}"
        echo -e "${RED}   Please add a CNAME or A record for ${hostname}${NC}"
        return 1
    else
        echo -e "${GREEN}   ✅ DNS record found${NC}"
        echo -e "   ${BLUE}→${NC} $result"
        
        # Check if it's pointing to Railway or a valid server
        if echo "$result" | grep -q "railway.app\|up.railway.app"; then
            echo -e "   ${GREEN}✅ Correctly pointing to Railway${NC}"
        else
            echo -e "   ${YELLOW}⚠️  Not pointing to Railway (may be OK if using other hosting)${NC}"
        fi
        return 0
    fi
    echo ""
}

# Test counters
tests_passed=0
tests_failed=0

# Test 1: Root domain
if check_dns "$DOMAIN" "Root domain (@)"; then
    ((tests_passed++))
else
    ((tests_failed++))
fi
echo ""

# Test 2: www subdomain
if check_dns "www.$DOMAIN" "WWW subdomain"; then
    ((tests_passed++))
else
    ((tests_failed++))
fi
echo ""

# Test 3: App subdomain
if check_dns "app.$DOMAIN" "App subdomain"; then
    ((tests_passed++))
else
    ((tests_failed++))
fi
echo ""

# Test 4: Wildcard - test with a random subdomain under app
random_subdomain="test-$(date +%s)"
if check_dns "$random_subdomain.app.$DOMAIN" "Wildcard test (random subdomain under app)"; then
    ((tests_passed++))
    echo -e "   ${GREEN}✅ Wildcard DNS is working! Any subdomain under app will resolve.${NC}"
else
    ((tests_failed++))
    echo -e "   ${RED}❌ Wildcard DNS not configured!${NC}"
    echo -e "   ${RED}Add this DNS record:${NC}"
    echo -e "   ${YELLOW}Type: CNAME, Name: *.app, Value: your-project.up.railway.app${NC}"
fi
echo ""

# Test 5: Check SSL (optional, requires curl)
echo -e "${YELLOW}🔍 Checking SSL certificate (optional)${NC}"
if command -v curl &> /dev/null; then
    ssl_result=$(curl -sI "https://$DOMAIN" 2>&1)
    if echo "$ssl_result" | grep -q "HTTP/2 200\|HTTP/1.1 200"; then
        echo -e "${GREEN}   ✅ HTTPS is working${NC}"
        ((tests_passed++))
    elif echo "$ssl_result" | grep -q "certificate"; then
        echo -e "${YELLOW}   ⚠️  SSL certificate issue (may still be provisioning)${NC}"
        echo -e "   ${YELLOW}Wait 10-30 minutes after DNS propagation${NC}"
    else
        echo -e "${YELLOW}   ⚠️  HTTPS not accessible yet (DNS may still be propagating)${NC}"
    fi
else
    echo -e "   ${YELLOW}⚠️  curl not installed, skipping SSL check${NC}"
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 Summary${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "Tests passed: ${GREEN}${tests_passed}${NC}"
echo -e "Tests failed: ${RED}${tests_failed}${NC}"
echo ""

if [ $tests_failed -eq 0 ]; then
    echo -e "${GREEN}╔═════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✅ All DNS checks passed!              ║${NC}"
    echo -e "${GREEN}║  Your domain is ready for deployment!  ║${NC}"
    echo -e "${GREEN}╚═════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "1. Deploy to Railway: railway up"
    echo "2. Add custom domains in Railway dashboard:"
    echo "   - $DOMAIN"
    echo "   - app.$DOMAIN"
    echo "   - *.app.$DOMAIN"
    echo "3. Set environment variable: NEXT_PUBLIC_BASE_DOMAIN=app.$DOMAIN"
    echo "4. Wait for SSL certificate provisioning (10-30 min)"
    echo "5. Test your site at: https://$DOMAIN"
else
    echo -e "${RED}╔═════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ❌ DNS configuration incomplete        ║${NC}"
    echo -e "${RED}╚═════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}Required DNS records (add in your DNS provider):${NC}"
    echo ""
    echo "┌──────────────────────────────────────────────────┐"
    echo "│ Type  │ Name  │ Value                           │"
    echo "├──────────────────────────────────────────────────┤"
    echo "│ CNAME │ @     │ your-project.up.railway.app     │"
    echo "│ CNAME │ app   │ your-project.up.railway.app     │"
    echo "│ CNAME │ *.app │ your-project.up.railway.app     │"
    echo "│ CNAME │ www   │ your-project.up.railway.app     │"
    echo "└──────────────────────────────────────────────────┘"
    echo ""
    echo -e "${YELLOW}See DNS_QUICKSTART.md for provider-specific instructions${NC}"
    echo ""
fi

# Additional tips
echo -e "${BLUE}💡 Helpful Commands:${NC}"
echo "  • Check DNS propagation: dig $DOMAIN"
echo "  • Check app subdomain: dig app.$DOMAIN"
echo "  • Check wildcard: dig anything.app.$DOMAIN"
echo "  • Online checker: https://www.whatsmydns.net/"
echo "  • Re-run this script: bash scripts/check-dns.sh"
echo ""

exit $tests_failed


