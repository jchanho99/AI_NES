import logging
import azure.functions as func
from main import run_analysis

app = func.FunctionApp()

@app.schedule(schedule="0 30 6 * * *", arg_name="myTimer", run_on_startup=True,
              use_monitor=False) 
def OSS_AINES(myTimer: func.TimerRequest) -> None:
    if myTimer.past_due:
        logging.info('The timer is past due!')
    run_analysis()
    logging.info('Python timer trigger function executed.')