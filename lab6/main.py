import sys

from PyQt5 import uic
from PyQt5.QtCore import pyqtSlot
from PyQt5.QtWidgets import QApplication, QWidget

from generator import ConstGenerator, UniformGenerator, nr
from modeller import RequestGenerator, RequestProcessor, event_based_modelling


# class MainWindow(QWidget):
    # def __init__(self, parent=None):
        # super(MainWindow, self).__init__(parent)
        # self._ui = uic.loadUi("window.ui", self)

    # @property
    # def parameters(self):
    #     u = self._ui
    #     return {
    #         'pg0_m': float(u.le_pg0_m.text()),
    #         'pg0_d': float(u.le_pg0_d.text()),
    #         'ev0_m': float(u.le_ev0_m.text()),
    #         'ev1_m': float(u.le_ev1_m.text()),
    #         'ev2_m': float(u.le_ev2_m.text()),
    #         'ev0_d': float(u.le_ev0_d.text()),
    #         'ev1_d': float(u.le_ev1_d.text()),
    #         'ev2_d': float(u.le_ev2_d.text()),
    #         'cid0_m': float(u.le_cid0_m.text()),
    #         'cid1_m': float(u.le_cid1_m.text()),
    #         'cid2_m': float(u.le_cid2_m.text()),
    #         'cid3_m': float(u.le_cid3_m.text()),
    #         'cid0_d': float(u.le_cid0_d.text()),
    #         'cid1_d': float(u.le_cid1_d.text()),
    #         'cid2_d': float(u.le_cid2_d.text()),
    #         'cid3_d': float(u.le_cid3_d.text()),
    #         'pcd0_m': float(u.le_pcd0_m.text()),
    #         'pcd1_m': float(u.le_pcd1_m.text()),
    #         'pcd0_d': float(u.le_pcd0_d.text()),
    #         'pcd1_d': float(u.le_pcd1_d.text()),
    #         'cc0_m': float(u.le_cc0_m.text()),
    #         'cc0_d': float(u.le_cc0_d.text()),
    #         'c_count': 500
    #     }

    # @pyqtSlot()
def on_pushButton_clicked(pg0_m, pg0_d, ev0_m, ev0_d, ev1_m, ev1_d, ev2_m, ev2_d, ev3_m, ev3_d, ti0_m, ti0_d,
        ti1_m, ti1_d, tu0_m, tu0_d, tu1_m, tu1_d, tu2_m, tu2_d, es0_m, es0_d, es1_m, es1_d, c_count):

        devices = start_modelling(pg0_m, pg0_d, ev0_m, ev0_d, ev1_m, ev1_d, ev2_m, ev2_d, ev3_m, ev3_d, ti0_m, ti0_d,
        ti1_m, ti1_d, tu0_m, tu0_d, tu1_m, tu1_d, tu2_m, tu2_d, es0_m, es0_d, es1_m, es1_d, c_count)

        # print(devices)
        # print()
        print('{:.2f} {:.2f} {:.2f} {:.2f} {:.2f} {:.2f} {:.2f} {:.2f} {:.2f} {:.2f} {:.2f}'.format(devices[1].max_waiting_time, 
                                                                                                    devices[2].max_waiting_time, 
                                                                                                    devices[3].max_waiting_time, 
                                                                                                    devices[4].max_waiting_time, 
                                                                                                    devices[5].max_waiting_time, 
                                                                                                    devices[6].max_waiting_time, 
                                                                                                    devices[7].max_waiting_time, 
                                                                                                    devices[8].max_waiting_time, 
                                                                                                    devices[9].max_waiting_time, 
                                                                                                    devices[10].max_waiting_time,
                                                                                                    devices[11].max_waiting_time,
                                                                                                    devices[12].max_waiting_time))
        # print('{:.2f}'.format(devices[1].max_waiting_time))
        # print('{:.2f}'.format(devices[2].max_waiting_time))
        # print('{:.2f}'.format(devices[3].max_waiting_time))
        # print('{:.2f}'.format(devices[4].max_waiting_time))
        # print('{:.2f}'.format(devices[5].max_waiting_time))
        # print('{:.2f}'.format(devices[6].max_waiting_time))
        # print('{:.2f}'.format(devices[7].max_waiting_time))
        # print('{:.2f}'.format(devices[8].max_waiting_time))
        # print('{:.2f}'.format(devices[9].max_waiting_time))
        # print('{:.2f}'.format(devices[10].max_waiting_time))
        # print('{:.2f}'.format(devices[11].max_waiting_time))

def start_modelling(pg0_m, pg0_d, ev0_m, ev0_d, ev1_m, ev1_d, ev2_m, ev2_d, ev3_m, ev3_d, ti0_m, ti0_d,
        ti1_m, ti1_d, tu0_m, tu0_d, tu1_m, tu1_d, tu2_m, tu2_d, es0_m, es0_d, es1_m, es1_d, c_count):

        random = nr.RandomState()
        people_generator0 = RequestGenerator(UniformGenerator(pg0_m, pg0_d, random), 'people0')
        people = (people_generator0,)

        # вход
        entrance0 = RequestProcessor(UniformGenerator(ev0_m, ev0_d, random), 'entrance0')
        entrance1 = RequestProcessor(UniformGenerator(ev1_m, ev1_d, random), 'entrance1')
        entrance2 = RequestProcessor(UniformGenerator(ev2_m, ev2_d, random), 'entrance2')
        entrance3 = RequestProcessor(UniformGenerator(ev3_m, ev3_d, random), 'entrance3')
        entrance = (entrance0, entrance1, entrance2, entrance3)

        # кассы
        till0 = RequestProcessor(UniformGenerator(ti0_m, ti0_d, random), 'till0')
        till1 = RequestProcessor(UniformGenerator(ti1_m, ti1_d, random), 'till1')
        till = (till0, till1)


        # турникеты
        turnstule0 = RequestProcessor(UniformGenerator(tu0_m, tu0_d, random), 'turnstule0')
        turnstule1 = RequestProcessor(UniformGenerator(tu1_m, tu1_d, random), 'turnstule1')
        turnstule2 = RequestProcessor(UniformGenerator(tu2_m, tu2_d, random), 'turnstule2')
        turnstule = (turnstule0, turnstule1, turnstule2)

        # эскалатор
        escalator0 = RequestProcessor(UniformGenerator(es0_m, es0_d, random), 'escalator0')
        escalator1 = RequestProcessor(UniformGenerator(es1_m, es1_d, random), 'escalator1')
        escalator = (escalator0, escalator1)


        train = RequestProcessor(ConstGenerator(0), 'train', is_exit=True)

        for p in people: p.add_receivers(entrance)
        for e in entrance: e.add_receivers(till)
        for t in till: t.add_receivers(turnstule)
        for tu in turnstule: tu.add_receivers(escalator)
        for es in escalator: es.add_receiver(train)


        devices = people + entrance + till + turnstule + escalator + (train,)
        # print(devices)
        event_based_modelling(devices, lambda: train.processed_requests == c_count)
        # print(devices)
        return devices

if __name__ == '__main__':
    # sys.exit(main())
    pg0_m = float(sys.argv[1])
    pg0_d = float(sys.argv[2])
    ev0_m = float(sys.argv[3])
    ev0_d = float(sys.argv[4])
    ev1_m = float(sys.argv[5])
    ev1_d = float(sys.argv[6])
    ev2_m = float(sys.argv[7])
    ev2_d = float(sys.argv[8])
    ev3_m = float(sys.argv[9])
    ev3_d = float(sys.argv[10])
    ti0_m = float(sys.argv[11])
    ti0_d = float(sys.argv[12])
    ti1_m = float(sys.argv[13])
    ti1_d = float(sys.argv[14])
    tu0_m = float(sys.argv[15])
    tu0_d = float(sys.argv[16])
    tu1_m = float(sys.argv[17])
    tu1_d = float(sys.argv[18])
    tu2_m = float(sys.argv[19])
    tu2_d = float(sys.argv[20])
    es0_m = float(sys.argv[21])
    es0_d = float(sys.argv[22])
    es1_m = float(sys.argv[23])
    es1_d = float(sys.argv[24])
    c_count = float(sys.argv[25])

    on_pushButton_clicked(pg0_m, pg0_d, ev0_m, ev0_d, ev1_m, ev1_d, ev2_m, ev2_d, ev3_m, ev3_d, ti0_m, ti0_d,
        ti1_m, ti1_d, tu0_m, tu0_d, tu1_m, tu1_d, tu2_m, tu2_d, es0_m, es0_d, es1_m, es1_d, c_count)

