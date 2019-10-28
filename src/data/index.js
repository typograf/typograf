import Typograf from '../typograf';

import common from './common';

import be from './be';
import bg from './bg';
import ca from './ca';
import da from './da';
import de from './de';
import el from './el';
import enGB from './en-GB';
import enUS from './en-US';
import eo from './eo';
import es from './es';
import et from './et';
import fi from './fi';
import fr from './fr';
import ga from './ga';
import hu from './hu';
import it from './it';
import lv from './lv';
import nl from './nl';
import no from './no';
import pl from './pl';
import ro from './ro';
import ru from './ru';
import sk from './sk';
import sl from './sl';
import sr from './sr';
import sv from './sv';
import tr from './tr';
import uk from './uk';

const data = [
    common,
    be,
    bg,
    ca,
    da,
    de,
    el,
    enGB,
    enUS,
    eo,
    es,
    et,
    fi,
    fr,
    ga,
    hu,
    it,
    lv,
    nl,
    no,
    pl,
    ro,
    ru,
    sk,
    sl,
    sr,
    sv,
    tr,
    uk
];

data.forEach(item => Typograf.setData(item));
