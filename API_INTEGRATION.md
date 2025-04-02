# Dynamis AI API Integration Architecture

## Table of Contents
1. [Core API Endpoints](#core-api-endpoints)
2. [Webhook Integration](#webhook-integration)
3. [Custom Integration Framework](#custom-integration-framework)
4. [API Monetization](#api-monetization)

## Core API Endpoints

### Financial Management API

#### 1. Expense Tracking
```python
# Example endpoint structure
POST /api/v1/financial/expenses
{
    "amount": 150.00,
    "category": "marketing",
    "date": "2024-03-20",
    "description": "Google Ads Campaign",
    "receipt_url": "https://storage.dynamis.ai/receipts/123.pdf"
}

# Response
{
    "id": "exp_123",
    "status": "processed",
    "categorized_as": "marketing",
    "tax_deductible": true,
    "processed_at": "2024-03-20T10:30:00Z"
}
```

#### 2. Invoicing
```python
# Create invoice
POST /api/v1/financial/invoices
{
    "client_id": "client_456",
    "items": [
        {
            "description": "Consulting Services",
            "amount": 1000.00,
            "quantity": 1
        }
    ],
    "due_date": "2024-04-20"
}

# Response
{
    "invoice_id": "inv_789",
    "status": "draft",
    "total_amount": 1000.00,
    "payment_link": "https://pay.dynamis.ai/inv_789"
}
```

#### 3. Cash Flow Forecasting
```python
# Get cash flow forecast
GET /api/v1/financial/forecast
{
    "period": "next_90_days",
    "include_recurring": true,
    "include_predictions": true
}

# Response
{
    "forecast": [
        {
            "date": "2024-03-20",
            "expected_income": 5000.00,
            "expected_expenses": 3000.00,
            "net_cash_flow": 2000.00
        }
    ],
    "confidence_score": 0.85
}
```

### CRM Integration API

#### 1. Lead Scoring
```python
# Update lead score
POST /api/v1/crm/leads/{lead_id}/score
{
    "interaction_type": "email_opened",
    "content_type": "product_demo",
    "duration": 120
}

# Response
{
    "lead_id": "lead_123",
    "new_score": 85,
    "score_factors": [
        {
            "factor": "email_engagement",
            "weight": 0.3,
            "value": 0.9
        }
    ]
}
```

#### 2. Customer Interactions
```python
# Log customer interaction
POST /api/v1/crm/interactions
{
    "customer_id": "cust_456",
    "type": "support_ticket",
    "channel": "email",
    "summary": "Product inquiry",
    "sentiment": "positive"
}

# Response
{
    "interaction_id": "int_789",
    "created_at": "2024-03-20T10:30:00Z",
    "next_follow_up": "2024-03-22",
    "priority": "medium"
}
```

### Task Automation API

#### 1. Task Prioritization
```python
# Prioritize tasks
POST /api/v1/automation/tasks/prioritize
{
    "tasks": [
        {
            "id": "task_123",
            "deadline": "2024-03-25",
            "importance": "high",
            "dependencies": ["task_456"]
        }
    ]
}

# Response
{
    "prioritized_tasks": [
        {
            "task_id": "task_123",
            "priority_score": 0.9,
            "suggested_order": 1,
            "estimated_completion": "2024-03-23"
        }
    ]
}
```

#### 2. Task Management
```python
# Create automated task
POST /api/v1/automation/tasks
{
    "name": "Follow-up Email",
    "trigger": {
        "type": "time_based",
        "delay": "2_days"
    },
    "action": {
        "type": "send_email",
        "template": "follow_up",
        "recipients": ["lead_123"]
    }
}

# Response
{
    "task_id": "auto_123",
    "status": "scheduled",
    "next_execution": "2024-03-22T10:00:00Z",
    "recurrence": "none"
}
```

### Project Management API

#### 1. Task Creation
```python
# Create project task
POST /api/v1/projects/{project_id}/tasks
{
    "title": "Design Review",
    "description": "Review new UI designs",
    "assignee": "user_123",
    "due_date": "2024-03-25",
    "priority": "high"
}

# Response
{
    "task_id": "task_789",
    "status": "created",
    "created_at": "2024-03-20T10:30:00Z",
    "estimated_hours": 2
}
```

#### 2. Project Scheduling
```python
# Update project schedule
PUT /api/v1/projects/{project_id}/schedule
{
    "tasks": [
        {
            "task_id": "task_123",
            "start_date": "2024-03-21",
            "end_date": "2024-03-25",
            "dependencies": ["task_456"]
        }
    ]
}

# Response
{
    "schedule_id": "sched_123",
    "status": "updated",
    "critical_path": ["task_123", "task_456"],
    "total_duration": "5_days"
}
```

## Webhook Integration

### QuoteIQ Webhook Adapter Example

#### 1. Webhook Configuration
```python
# Configure webhook endpoint
POST /api/v1/webhooks/configure
{
    "provider": "quoteiq",
    "url": "https://api.dynamis.ai/webhooks/quoteiq",
    "events": ["quote.created", "quote.updated"],
    "secret": "whk_live_123456789"
}

# Response
{
    "webhook_id": "whk_123",
    "status": "active",
    "last_triggered": null
}
```

#### 2. Webhook Handler Implementation
```python
# Example webhook handler for QuoteIQ
async def handle_quoteiq_webhook(request: Request):
    # Verify webhook signature
    signature = request.headers.get('X-QuoteIQ-Signature')
    if not verify_signature(signature, request.body):
        raise HTTPException(status_code=401, detail="Invalid signature")

    # Process webhook data
    data = await request.json()
    
    # Create CRM entry
    crm_entry = {
        "source": "quoteiq",
        "quote_id": data["quote_id"],
        "amount": data["amount"],
        "customer": {
            "name": data["customer_name"],
            "email": data["customer_email"]
        },
        "status": "new_lead"
    }
    
    # Store in CRM
    await create_crm_entry(crm_entry)
    
    return {"status": "processed"}
```

#### 3. Webhook Monitoring
```python
# Get webhook status
GET /api/v1/webhooks/{webhook_id}/status

# Response
{
    "webhook_id": "whk_123",
    "status": "active",
    "last_triggered": "2024-03-20T10:30:00Z",
    "success_rate": 0.98,
    "recent_errors": []
}
```

## Custom Integration Framework

### API Key Management
```python
# Create API key
POST /api/v1/integrations/keys
{
    "name": "Custom Integration",
    "permissions": ["read:financial", "write:expenses"],
    "rate_limit": 1000,
    "expires_at": "2024-12-31"
}

# Response
{
    "key_id": "key_123",
    "api_key": "dyn_live_123456789",
    "created_at": "2024-03-20T10:30:00Z"
}
```

### Usage Monitoring
```python
# Get API usage
GET /api/v1/integrations/usage

# Response
{
    "total_requests": 1500,
    "rate_limit": 1000,
    "endpoints": {
        "/api/v1/financial/expenses": {
            "requests": 500,
            "errors": 2
        }
    }
}
```

## API Monetization

### Freemium Features

#### Basic Tier (Free)
- 100 API calls per month
- Basic financial tracking
- Limited CRM features
- Standard support
- 1 webhook endpoint

#### Premium Tier ($99/month)
- 10,000 API calls per month
- Advanced financial analytics
- Full CRM capabilities
- Priority support
- 5 webhook endpoints
- Custom integrations
- Real-time data sync

### Implementation Guide

#### 1. Set Up Usage Tracking
```python
# Track API usage
async def track_api_usage(request: Request):
    api_key = request.headers.get('X-API-Key')
    endpoint = request.url.path
    
    # Update usage in database
    await update_usage(api_key, endpoint)
    
    # Check rate limits
    if await is_rate_limited(api_key):
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
```

#### 2. Implement Feature Flags
```python
# Check feature access
async def check_feature_access(api_key: str, feature: str):
    tier = await get_api_tier(api_key)
    
    if feature in PREMIUM_FEATURES and tier != "premium":
        raise HTTPException(
            status_code=403,
            detail="This feature requires a premium subscription"
        )
```

### Best Practices

1. **Rate Limiting**
   - Implement per-endpoint limits
   - Use sliding window algorithm
   - Provide rate limit headers

2. **Error Handling**
   - Use standard HTTP status codes
   - Provide detailed error messages
   - Include error codes for debugging

3. **Documentation**
   - Maintain OpenAPI/Swagger docs
   - Provide code examples
   - Include rate limit information

4. **Security**
   - Use API key authentication
   - Implement request signing
   - Enable IP whitelisting

5. **Monitoring**
   - Track usage patterns
   - Monitor error rates
   - Set up alerts for abuse

### Example Implementation

```python
# API endpoint with feature checking
@router.post("/api/v1/financial/forecast")
async def get_cash_flow_forecast(
    request: Request,
    forecast_data: ForecastRequest
):
    # Check API key and tier
    api_key = request.headers.get('X-API-Key')
    await check_feature_access(api_key, "cash_flow_forecast")
    
    # Track usage
    await track_api_usage(request)
    
    # Generate forecast
    forecast = await generate_forecast(forecast_data)
    
    return {
        "forecast": forecast,
        "usage": {
            "remaining_calls": await get_remaining_calls(api_key),
            "reset_time": await get_rate_limit_reset(api_key)
        }
    }
``` 