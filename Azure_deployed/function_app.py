import logging
import azure.functions as func
from integrate import excute
app = func.FunctionApp()

@app.schedule(schedule="0 0 21 * * *", arg_name="myTimer", run_on_startup=False,
              use_monitor=False) 
def timer_trigger(myTimer: func.TimerRequest) -> None:
    if myTimer.past_due:
        logging.info('The timer is past due!')
    logging.info("The main file is starting now")
    excute()
    logging.info('Python timer trigger function executed.')